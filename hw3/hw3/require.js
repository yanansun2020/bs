const vm = require('vm');
const process = require('process');

const context = {};
vm.createContext(context)

const newmask = 0o022;
const oldmask = process.umask(newmask);
let process_code = 'console.log(`change umask from ${oldmask.toString(8)} to  ${newmask.toString(8)}\n`);'
//let process_code='console.log(1)'
vm.runInContext(process_code, context);

console.log(context.exp);