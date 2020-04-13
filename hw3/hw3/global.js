const vm = require('vm');
const context = {};
vm.createContext(context)

global.name="syn"

let global_code='console.log(global.name)'
vm.runInContext(global_code, context);

console.log(context.exp);