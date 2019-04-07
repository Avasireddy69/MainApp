require('./api/data/db.js');

var express = require('express');

var server = express();

var path = require('path');

var routes = require('./api/routes');

var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var passport = require('passport');


/* server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); */
  server.options('*', cors()); 

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({

    extended: true

}));

server.set('port',3000);

 

server.use((req,res,next)=>

{

    console.log(req.method, req.url);

    next();

   

});

 

server.use(express.static(path.join(__dirname,'public')));

 


server.use(passport.initialize());
server.use(passport.session());

require('../MEAN/api/data/passport')(passport);


server.use('/api',routes);

server.use(cors);


var server = server.listen(server.get('port'),()=>

{

    var port = server.address().port;

    console.log('Express magic happens on port '+port);

});




