  class dfp{
    constructor() {
      this.p = [-3.0, -3.0];
      this.grad = 0;
      this.func = 0;
      this.f=[0.0];
    }

    test(){
      let iter=this.davidonFletcherPowell(this.p,2,99,0.00001,this.f);
      console.log("iter=%i, calls=%i+%i\n",iter,this.grad,this.func);
      console.log("p=%lG,%lG\n",this.p[0],this.p[1]);
    }

    sq(x){
      //input double x
      //return double
      return x*x;
    }

    funcOp(s){
      //input double array s
      //output double
      this.func++;
      return (Math.cosh(s[0]-0.5)+this.sq(s[1]-0.5))/8.0;//this is z. our problem here to solve.
    }

    funcOpTest(s){
      //input double array s
      //output double
      return (Math.cosh(s[0]-0.5)+this.sq(s[1]-0.5))/8.0;//this is z. our problem here to solve.
    }

    gradOp(p,g)
    {
      //input doulbe p, g
      this.grad++;
      g[0]=Math.sinh(p[0]-0.5)/8.0;
      g[1]=(2.0*p[1]-1.0)/8.0;
      console.log("g[0]",g[0]);
      console.log("g[1]",g[1]);
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

        
    // davidonFletcherPowell(p,n,itmax,epsilon,f)
    // {
    //   let f1 = null;
    //   let f2 = null;
    //   let yHy = [];
    //   let yTs = [];
    //   let i, it, jt, j;
    //   let a;
    //   let g = new Array(n * (n + 5)).fill(0);  
    //   let d = g.slice(0, n);
    //   let q= d.slice(0,n);
    //   let s= q.slice(0,n);
    //   let y= s.slice(0,n);
    //   let h = new Array(n * n).fill(0);
    //   f2=this.funcOp(p);
    //   console.log("it=0, x" + p.map((value, i) => (i === 0 ? " = " : ", ") + value).join("") + ", f=" + f2);
    //   // ok console.log("f2",f2);
    //   this.gradOp(p, g);
    //   for (i = 0; i < n; i++) {
    //     for (j = 0; j < n; j++) {
    //       h[n*i+j]=0.;
    //     }
    //     h[n * i + i] = 1;
    //     d[i] = -g[i];
    //   }
    //   for (it = 1; it <= itmax; it++) {
    //     a = 1;
    //     for (jt = 0; jt < 32; jt++) {
    //       for (i = 0; i < n; i++) {
    //         s[i] = p[i] + d[i] / a;
    //       }

    //       f2 = this.funcOp(s);
    //       if (f2 < f[0]) {
    //         break;
    //       }
    //       if(jt === 0){
    //         a = 2;
    //       }else if(jt%2){
    //         a = -a;
    //       }else{
    //         a = -a * 2;
    //       }
    //     }
    //     console.log("it=" + it + ", x" + p.map((value, i) => (i === 0 ? " = " : ", ") + value).join("") + ", f=" + f2);
    //     for (i = 0; i < n; i++) {
    //       s[i] = d[i] / a;
    //       p[i] += s[i];
    //     }
    //     f1 = f[0];
    //     f[0] = f2;
    //     console.log("f2",f2);
        
    //     // console.log(2 * Math.abs(f1 - f2) );
    //     // console.log(epsilon * (Math.abs(f1) + Math.abs(f2) + epsilon));
    //     if (2 * Math.abs(f1 - f2) <= epsilon * (Math.abs(f1) + Math.abs(f2) + epsilon)) {
    //       break;
    //     }
    //     y = g.slice(); // Clone 'g' to 'y'
    //     this.gradOp(p,g);
    //     for (i = 0; i < n; i++) {
    //       y[i] = g[i] - y[i];
    //     }
    //     this.mult(h,y,q,n,n,1);
    //     this.mult(y,s,yTs,1,n,1);
    //     this.mult(y,q,yHy,1,n,1);
    //     for (i = 0; i < n; i++) {
    //       for (j = 0; j < n; j++) {
    //         h[n * i + j] += -q[i] * q[j] / yHy[0] + s[i] * s[j] / yTs[0];
    //       }
    //     }
    //     for (i = 0; i < n; i++) {
    //       d[i] = 0;
    //       for (j = 0; j < n; j++) {
    //         d[i] -= h[n * i + j] * g[j];
    //       }
    //     }
    //   }
    //   if (it > itmax) {
    //     return -it;
    //   }
    //   return it;
    // }

    davidonFletcherPowell(p, n, itmax, epsilon, f) {
      let i, it, j, jt;
      let a, f1, f2;
      let d, g, h, q, s, y;
      let yHy=[];
      let yTs=[];
      g = new Array(n * (n + 5)).fill(0);
      d = g.slice(n);
      q = d.slice(n);
      s = q.slice(n);
      y = s.slice(n);
      h = y.slice(n);
      console.log("L152_y_0", y);//ng
    
      f2 = this.funcOp(p); // You need to define 'func' function
    
      console.log("it=0, x" + p.map((value, index) => (index ? ", " : "=") + value).join("") + ", f=" + f2);
      for (i = 0; i < n; i++) {

      }
      
      this.gradOp(p, g); // You need to define 'grad' function
    
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          h[n * i + j] = 0;
        }
        h[n * i + i] = 1;
        d[i] = -g[i];
      }
    
      for (it = 1; it <= itmax; it++) {
        a = 1.0;
        console.log("p_start_" + it, p);
    
        for (jt = 0; jt < 32; jt++) {
          for (i = 0; i < n; i++) {
            s[i] = p[i] + d[i] / a;
            console.log("L179_s_" + i + '_' + it, s[i]);//ok
          }
          
          f2 = this.funcOp(s); 
          console.log("f2_" + it ,f2);//ok
          if (f2 < f[0]) {
            break;
          }
    
          if (jt === 0) {
            a = 2;
          } else if (jt % 2) {
            a = -a;
          } else {
            a = -a * 2;
          }
        }
    
        console.log("it=" + it);
    
        for (i = 0; i < n; i++) {
          s[i] = d[i] / a;
          p[i] += s[i];
          console.log('p{'+i+'}',p[i]);
        }
        //ok
        f1 = f[0];
        f[0] = f2;
    
        console.log("L204",2 * Math.abs(f1 - f2));
        console.log("L204",epsilon * (Math.abs(f1) + Math.abs(f2) + epsilon));
        console.log("L204f1",f1);
        console.log("L204f2",f2);//ok
    
        if (2 * Math.abs(f1 - f2) <= epsilon * (Math.abs(f1) + Math.abs(f2) + epsilon)) {
          break;
        }
    
        console.log("L214y",y);
        console.log("L215g",g);
        for (i = 0; i < n; i++) {
          y[i] = g[i];
        }
        console.log("L219y",y);//ok
        
    
        this.gradOp(p, g); // You need to define 'grad' function

        for (i = 0; i < n; i++) {
          y[i] = g[i] - y[i];
        }
        

      
    
        this.mult(h, y, q, n, n, 1); // You need to define 'mult' function
        this.mult(y, s, yTs, 1, n, 1); // Assuming yTs is a scalar value
        this.mult(y, q, yHy, 1, n, 1); // Assuming yHy is a scalar value
        console.log("L234y",y);//ok
        console.log("L235yTs",yTs);//ok?


       
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            h[n * i + j] += -q[i] * q[j] / yHy + s[i] * s[j] / yTs;
          }
        }
        console.log("L244h",h);//ok
    
        for (let i = 0; i < n; i++) {
          d[i] = 0;
          for (let j = 0; j < n; j++) {
            d[i] -= h[n * i + j] * g[j];
          }
        }        
        console.log("L251d",d);//ng


      }

      g = null;
    
      if (it > itmax) {
        return -it;
      }
      return it;
    }
    
    mult(u, v, w, l, m, n) {
      for (let i = 0; i < l; i++) {
        for (let j = 0; j < n; j++) {
          w[n * i + j] = 0;
          for (let k = 0; k < m; k++) {
            w[n * i + j] += u[m * i + k] * v[n * k + j];
          }
        }
      }
    }
    
  }

let instance = new dfp();
instance.test();
let s = [-1.887191208760259,-1.745127713925089];
let r = instance.funcOpTest(s);
console.log(r);