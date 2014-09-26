'use strict';

var express = require('express');
var app = express();
var port = 3000;

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/'
}));

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'handlebars');


app.get('/', function (request, response) {
    response.render('index');
});


app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
