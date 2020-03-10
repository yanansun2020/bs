var express = require('express');
var app = express();
var cookieSession = require('cookie-session')
var port = 3000

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://evil.local:3002");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
        res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Max-Age", "-1");
        next();
      });

app.use(cookieSession({
    name: 'session',
    keys: ['akey'],
}))

app.get('/', function (req, res, next) {
    req.session.id = 1
    res.end('Hi welcome to bank');
})

// Sensitive information!
app.get('/viewbalance', function (req, res, next) {
    if (req.session.id === 1) 
        res.end('SECRET BANK ACCOUNT BALANCE: 18636'); 
    else
        res.end('Not allowed.');
})

app.listen(port, () => {  
    console.log(`bank.local started at port ${port}`) 
});
