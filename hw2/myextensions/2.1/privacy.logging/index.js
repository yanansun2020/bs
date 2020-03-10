var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var port = 3000;
const fs = require('fs');
//TODO change it as your environments
const filePath = '/tmp/test.csv';
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "false");
    res.header("Access-Control-Max-Age", "-1");
    next();
});


app.get('/', function (req, res) {
    console.log(req.query);
    res.send("get your information")
})

app.post('/geolocation', function (req, res) {
    console.log(req.body);
    res.send("get your information")
})

app.post('/sync', function (req, res) {
    var data = JSON.stringify(req.body);
    console.log(req.body.url)
    fs.appendFile(filePath, req.body.url +",", function(err) {
        if(err) {
            return console.log(err);
        }
    });
    res.end('success.');

})

app.get('/read', function (req, res) {
    fs.readFile(filePath, 'utf8', function(err, contents) {
        console.log(contents);
        res.send(contents);
    })
})



// Sensitive information!
//python run_test1.py /home/yanan/work/bs/hw2/myextensions/privacytracking http://localhost:3000/read
app.get('/viewbalance', function (req, res, next) {
    console.log("1")
    if (req.session.id === 1)
        res.end('SECRET BANK ACCOUNT BALANCE: 18636');
    else
        res.end('Not allowed.');
})

app.listen(port, () => {
    console.log(`localhost:3000 ${port}`)
});
