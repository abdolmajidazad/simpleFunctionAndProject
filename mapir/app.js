const express = require('express')
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = 4000

var path = require('path');

app.get('/', function(req, res) {
    console.log('ssss')
    res.sendFile(path.join(__dirname + '/index.html'));
    // res.sendFile(path.join(__dirname + '/indexMaterial.html'));
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.post('/api/v1/todos', function (req, res) {
    console.log("name", req.body)
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        data : req.body
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))