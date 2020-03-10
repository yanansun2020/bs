const express = require('express')
const app = express()
const port = 3002

let sendEvil = (req, res) => {
    res.sendFile('evil.html', { root: __dirname })
}

app.get('/', sendEvil)

app.get('/evil.html', sendEvil)

app.listen(port, () => {
    console.log(`evil.local server listening on port ${port}!`)
})
    