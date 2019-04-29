const express = require('express')
const app = express()
const port = 4000

var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.use(express.static(__dirname + '/resource'));
// app.use('/resource', express.static('public'))
app.use('/html5', express.static(path.join(__dirname, 'html5')))
app.use('/dashjs', express.static(path.join(__dirname, 'dashjs')))
app.use('/dashjsSimple', express.static(path.join(__dirname, 'dashjsSimple')))
app.use('/html5Simple', express.static(path.join(__dirname, 'html5Simple')))
app.use('/resource', express.static(path.join(__dirname, 'resource')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))