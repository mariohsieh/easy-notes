//// modules *************************************
var express = require('express'),
	app = express();
	
	
//// configuration *******************************
var port = process.env.PORT || 9090;
	//database = require('./config/database');

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	//app.use(express.bodyParser());
	//app.use(express.methodOverride());
});


//// routes **************************************
app.get('/', function(req,res) {
	//res.sendfile('./public/index.html');
	res.send('holla');
});


//// start application ***************************
app.listen(port);
console.log("App running on localhost:9090");
