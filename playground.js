const {Differentiate} = require('./derivative');
const differentiate = new Differentiate();
const {Service} = require('./service');
const service = new Service();

const dydx = differentiate.execute('0.005548959  x^5 + 0.007838187  x^4 - 0.0171525  x^3 - 0.099091188  x^2 + 0.204906823  x + 0.256927508');
// differentiate.execute();
const y = service.excecute('-2^3-2^2+3^1');
console.log('y',y);