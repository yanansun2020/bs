const express = require('express')
const app = express()
app.use(express.static(__dirname))
const port = 3001

let sendEvil = (req, res) => {
    res.sendFile('evil.html', { root: __dirname })
}

app.get('/', function (req, res) {
    console.log(req.query);
    res.send("success");
})

app.get('/evil.html', sendEvil)

app.listen(port, () => {
    console.log(`evil.local server listening on port ${port}!`)
})
    