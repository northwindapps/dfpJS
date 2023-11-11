const {Differentiate} = require('./derivative');
const differentiate = new Differentiate();
const {Service} = require('./service');
const service = new Service();

class NewtonRapson{
    constructor() {}

    //many want to know the value x for target y=0
    newtonRapson(fx,targetY,guessX,convergence){
        let x = guessX;
        let iter = 0;
        let isLoop = true;
        let y = fx;
        while (isLoop) {
            // While True
            let dydx = differentiate.execute(fx);
            let xset = dydx.replace(/x/g, '(' + String(x) + ')');
            let dydxValue = service.excecute(xset);
            let xsetY = y.replace(/x/g, '(' + String(x) + ')');
            let yValue = service.excecute(xsetY);
            if (Math.abs(yValue - targetY) <= convergence) {
                isLoop = false;
            }
            x = x + (targetY -yValue) /dydxValue;
            iter += 1;
        }
        console.log('x',x);
        console.log('iter',iter);


    }

}

let nr = new NewtonRapson();
nr.newtonRapson('0.005548959  x^5 + 0.007838187  x^4 - 0.0171525  x^3 - 0.099091188  x^2 + 0.204906823  x + 0.256927508',0,0,0.01);