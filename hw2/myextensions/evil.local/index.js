const express = require('express')
const app = express()
app.use(express.static(__dirname))
const port = 3001
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  /*  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "false");
    res.header("Access-Control-Max-Age", "-1");*/
    next();
});

let sendEvil = (req, res) => {
    res.sendFile('evil.html', { root: __dirname })
}

app.get('/', sendEvil)

app.get('/synctag', function (req, res) {
    console.log(req.query);
    res.send("success");
})


app.get('/evil.html', sendEvil)

app.listen(port, () => {
    console.log(`evil.local server listening on port ${port}!`)
})
    