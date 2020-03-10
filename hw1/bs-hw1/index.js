const express = require('express')
const app = express()
const http = require('http');
app.use(express.static(__dirname))
const port = 3001
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://evil.local:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "false");
    res.header("Access-Control-Max-Age", "-1");
    next();
});



var get_cookies = function(request) {
    var cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};



let sendEvil = (req, res) => {
    res.sendFile('evil.html', { root: __dirname })
}

app.get('/', sendEvil)

app.get('/contact', function (req, res) {
    res.writeHead(301, {'Location' : 'http://192.168.2.83:5005/contact'});
    console.log(res._header)
    res.end();
  /*  const url  = 'http://192.168.2.83:5005/contact';
    console.log(req.headers)
    var ServerCookie = req.headers.cookie;
    console.log(ServerCookie)
    superagent.get(url).set('Cookie', "323131").end(function(err, response){
        if(err){
            console.log("error")
        }else{
            res.send(response.body)
        }
    })*/
   /* var sreq = superagent.get('');
    sreq.pipe(req);
    sreq.on('end', function () {
        console.log("send success")
    })*/
})

app.get('/logout', function (req, res) {
    var cookie = get_cookies(req)['connect.sid'];
    console.log('start to logout ' + cookie);
    res.writeHead(301, {
        'Set-Cookie': cookie,
        'Location' : 'http://192.168.2.83:5005'
    });
    console.log(res)
    res.end()
})

app.get('/evil.html', sendEvil)

app.listen(port, () => {
    console.log(`evil.local server listening on port ${port}!`)
})
    