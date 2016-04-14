/**
 * Created by angelgonzalez on 4/6/16.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.NODE_PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname}, function(err){
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            //console.log('Sent:');
        }
    })
});

app.listen(PORT, function() {
    console.log('Server listening at port ' + PORT)
});