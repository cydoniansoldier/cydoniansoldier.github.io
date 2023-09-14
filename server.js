var express = require('express');
var app = express();
var PORT = 8081

app.use(express.static('public'));
app.use(express.json());

app.post('/', function (req, res) {
    console.log(req.body)
    res.json(req.body)
    res.end();
})
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});