// #define _CRT_SECURE_NO_DEPRECATE
// #include <stdio.h>
// #include <stdlib.h>
// #include <float.h>
// #define _USE_Math_DEFINES
// #include <Math.h>





// void ResidualSurface(char*fname)
//   {
//   int nx=96,ny=96,x,y;
//   double p[2];
//   FILE*fp;
//   fp=fopen(fname,"wt");
//   fconsole.log(fp,"%i\n",nx);
//   for(x=0;x<nx;x++)
//     {
//     p[0]=-4.+x*8./(nx-1);
//     fconsole.log(fp,"%lG\n",p[0]);
//     }
//   fconsole.log(fp,"%i\n",ny);
//   for(y=0;y<ny;y++)
//     {
//     p[1]=-4.+y*8./(ny-1);
//     fconsole.log(fp,"%lG\n",p[1]);
//     }
//   fconsole.log(fp,"%i\n",nx*ny);
//   for(y=0;y<ny;y++)
//     {
//     p[1]=-4.+y*8./(ny-1);
//     for(x=0;x<nx;x++)
//       {
//       p[0]=-4.+x*8./(nx-1);
//       fconsole.log(fp,"%lG\n",prepareProblem(p));
//       }
//     }
//   fclose(fp);
//   }

// int main(int argc,char**argv,char**envp)
//   {
//   int iter;
//   static double f,p[2];
//   p[0]=p[1]=-3.;
//   iter=DavidonFletcherPowell(p,2,99,0.00001,&f);
//   console.log("iter=%i, calls=%i+%i\n",iter,calls.grad,calls.func);
//   console.log("p=%lG,%lG\n",p[0],p[1]);
//   console.log("f=%lG\n",f);
//   // ResidualSurface("this.tb2");
//   return(0);
//   }



  class dfp{
    constructor() {
      this.p = [-3.0, -3.0];
      this.grad = 0;
      this.func = 0;
      this.f=[null];
    }
    // static grad;
    // static func;
    // static iter;
    // static f;
    // static p = [-3.0, -3.0];

    test(){
      iter=this.davidonFletcherPowell(this.p,2,99,0.00001,this.f);
      console.log("iter=%i, calls=%i+%i\n",iter,this.grad,this.func);
      console.log("p=%lG,%lG\n",this.p[0],this.p[1]);
    }

    sq(x){
      //input double x
      //return double
      return(x*x);
    }

    prepareProblem(){
      //input double p
      //output double
      this.func++;
      return((Math.cosh(this.p[0]-0.5)+this.sq(this.p[1]-0.5))/8.);//this is z. our problem here to solve.
    }

    gradOp(p,g)
    {
      //input doulbe p, g
      this.grad++;
      g[0]=Math.sinh(p[0]-0.5)/8.;
      g[1]=(2.*p[1]-1.)/8.;
    }

    

    mult(u,v,w,l,m,n)
    {
      //input double u, v,w
      //input int l,m,n
      for (let i = 0; i < l; i++) {
        for (let j = 0; j < n; j++) {
          w[n * i + j] = 0;
          for (let k = 0; k < m; k++) {
            w[n * i + j] += u[m * i + k] * v[n * k + j];
          }
        }
      }
      
    }

        
    davidonFletcherPowell(p,n,itmax,epsilon,f)
    {
      //return int
      //int
      // let i,it,j,jt;
      //double
      let f1 = null;
      let yHy = 0.1;
      let yTs = 0.1;
      let i, it, jt;
      let a;
      let g = new Array(n * (n + 5)).fill(0);  
      let d = g.slice(0, n);
      let q= d.slice(0,n);
      let s= q.slice(0,n);
      let y= s.slice(0,n);
      let h= y.slice(0,n);
      let f2=this.prepareProblem(p);
      console.log("it=0, x" + p.map((value, i) => (i === 0 ? " = " : ", ") + value).join("") + ", f=" + f2);
  this.gradOp(p, g);
  for (i = 0; i < n; i++) {
    h[n * i + i] = 1;
    d[i] = -g[i];
  }
  for (it = 1; it <= itmax; it++) {
    a = 1;
    for (jt = 0; jt < 32; jt++) {
      for (i = 0; i < n; i++) {
        s[i] = p[i] + d[i] / a;
      }
      f2 = this.prepareProblem(s);
      if (f2 < f[0]) {
        break;
      }
      a = jt === 0 ? 2 : (jt % 2 ? -a : -a * 2);
    }
    console.log("it=" + it + ", x" + p.map((value, i) => (i === 0 ? " = " : ", ") + value).join("") + ", f=" + f2);
    f1 = f[0];
    f[0] = f2;
    if (2 * Math.abs(f1 - f2) <= epsilon * (Math.abs(f1) + Math.abs(f2) + epsilon)) {
      break;
    }
    y = g.slice(); // Clone 'g' to 'y'
    this.gradOp(p, g);
    for (i = 0; i < n; i++) {
      y[i] = g[i] - y[i];
    }
    this.mult(h, y, q, n, n, 1);
    this.mult(y,s,yTs,1,n,1);
    this.mult(y,q,yHy,1,n,1);
    for (i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        h[n * i + j] += -q[i] * q[j] / yHy + s[i] * s[j] / yTs;
      }
      d[i] = 0;
      for (let j = 0; j < n; j++) {
        d[i] -= h[n * i + j] * g[j];
      }
    }
  }
  if (it > itmax) {
    return -it;
  }
  return it;
}
  }

let instance = new dfp();
instance.test();
