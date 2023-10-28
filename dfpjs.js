#define _CRT_SECURE_NO_DEPRECATE
#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#define _USE_MATH_DEFINES
#include <math.h>

double sq(double x)
  {
  return(x*x);
  }

struct{int grad,func;}calls;

double func(double*p)
  {
  calls.func++;
  return((cosh(p[0]-0.5)+sq(p[1]-0.5))/8.);//this is z. our problem here to solve.
  }

void grad(double*p,double*g)
  {
  calls.grad++;
  g[0]=sinh(p[0]-0.5)/8.;
  g[1]=(2.*p[1]-1.)/8.;
  }

void mult(double*u,double*v,double*w,int l,int m,int n)
  {
  int i,j,k;
  for(i=0;i<l;i++)
    for(j=0;j<n;j++)
      for(w[n*i+j]=k=0;k<m;k++)
        w[n*i+j]+=u[m*i+k]*v[n*k+j];
  }

int DavidonFletcherPowell(double*p,int n,int itmax,double epsilon,double*f)
  {
  int i,it,j,jt;
  double a,f1,f2,*d,*g,*h,*q,*s,*y,yHy,yTs;
  g=calloc(n*(n+5),sizeof(double));
  d=g+n;
  q=d+n;
  s=q+n;
  y=s+n;
  h=y+n;
  f2=func(p);
  printf("it=0, x");
  for(i=0;i<n;i++)
    printf("%s%lG",i?",":"=",p[i]);
  printf(", f=%lG\n",f2);
  grad(p,g);
  for(i=0;i<n;i++)
    {
    for(j=0;j<n;j++)
      h[n*i+j]=0.;
    h[n*i+i]=1.;
    d[i]=-g[i];
    }
  for(it=1;it<=itmax;it++)
    {
    a=1.;
    for(jt=0;jt<32;jt++)
      {
      for(i=0;i<n;i++)
        s[i]=p[i]+d[i]/a;
      f2=func(s);
      if(f2<*f)
        break;
      if(jt==0)
        a=2.;
      else if(jt%2)
        a=-a;
      else
        a=-a*2.;
      }
    printf("it=%i, x",it);
    for(i=0;i<n;i++)
      {
      s[i]=d[i]/a;
      p[i]+=s[i];
      printf("%s%lG",i?",":"=",p[i]);
      }
    f1=*f;
    *f=f2;
    printf(", f=%lG\n",f2);
    if(2.*fabs(f1-f2)<=epsilon*(fabs(f1)+fabs(f2)+epsilon))
      break;
    for(i=0;i<n;i++)
      y[i]=g[i];
    grad(p,g);
    for(i=0;i<n;i++)
      y[i]=g[i]-y[i];
    mult(h,y,q,n,n,1);
    mult(y,s,&yTs,1,n,1);
    mult(y,q,&yHy,1,n,1);
    for(i=0;i<n;i++)
      for(j=0;j<n;j++)
        h[n*i+j]+=-q[i]*q[j]/yHy+s[i]*s[j]/yTs;
    for(i=0;i<n;i++)
      for(d[i]=j=0;j<n;j++)
        d[i]-=h[n*i+j]*g[j];
    }
  free(g);
  if(it>itmax)
    return(-it);
  return(it);
  }

void ResidualSurface(char*fname)
  {
  int nx=96,ny=96,x,y;
  double p[2];
  FILE*fp;
  fp=fopen(fname,"wt");
  fprintf(fp,"%i\n",nx);
  for(x=0;x<nx;x++)
    {
    p[0]=-4.+x*8./(nx-1);
    fprintf(fp,"%lG\n",p[0]);
    }
  fprintf(fp,"%i\n",ny);
  for(y=0;y<ny;y++)
    {
    p[1]=-4.+y*8./(ny-1);
    fprintf(fp,"%lG\n",p[1]);
    }
  fprintf(fp,"%i\n",nx*ny);
  for(y=0;y<ny;y++)
    {
    p[1]=-4.+y*8./(ny-1);
    for(x=0;x<nx;x++)
      {
      p[0]=-4.+x*8./(nx-1);
      fprintf(fp,"%lG\n",func(p));
      }
    }
  fclose(fp);
  }

int main(int argc,char**argv,char**envp)
  {
  int iter;
  static double f,p[2];
  p[0]=p[1]=-3.;
  iter=DavidonFletcherPowell(p,2,99,0.00001,&f);
  printf("iter=%i, calls=%i+%i\n",iter,calls.grad,calls.func);
  printf("p=%lG,%lG\n",p[0],p[1]);
  printf("f=%lG\n",f);
  ResidualSurface("dfp.tb2");
  return(0);
  }
