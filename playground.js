const {Differentiate} = require('./derivative');
const differentiate = new Differentiate();
const {Service} = require('./service');
const service = new Service();
const exp = '0.005548959 * x^5 + 0.007838187 *x^4 -0.0171525*x^3 - 0.099091188*x^2 + 0.204906823*x + 0.256927508';
const dydx = differentiate.execute(exp);
//'0.005548959  x^5 + 0.007838187  x^4 - 0.0171525  x^3 - 0.099091188  x^2 + 0.204906823  x + 0.256927508'
// differentiate.execute();
console.log('dydx',dydx);
const xset = dydx.replace(/x/g, '(' + '3' + ')');
const y = service.excecute(xset);
let xsetY = exp.replace(/x/g, '(' + String(3) + ')');
let yValue = service.excecute(xsetY);
console.log('y',yValue);
console.log('dydxValue',y);