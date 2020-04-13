const vm = require('vm');
const context = {};
vm.createContext(context)
let secret = '14828'

//secret
let secret_code = 'console.log(secret)';
vm.runInContext(secret_code, context);

//object
let obj = {type:"Fiat", model:"500"};
let obj_code='console.log(obj)'
vm.runInContext(obj_code, context);

console.log(context.exp);