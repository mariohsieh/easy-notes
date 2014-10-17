//// modules *************************************
var express 				= require('express'),
		app 						= express(),
		morgan 					= require('morgan'),
		bodyParser 			= require('body-parser'),
		methodOverride 	= require('method-override'),
		mongoose 				= require('mongoose');


//// configuration *******************************
var port = process.env.PORT || 9090,					// set port
		url = 'mongodb://root:root@ds052827.mongolab.com:52827/easynotes';	// for mongolab
		//url = 'mongodb://localhost/easynotes';		// for localhost

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


//// models **************************************
var Note = require('./app/note')(mongoose);


//// routes **************************************
require('./app/routes')(app, Note);

	
//// start server ********************************
mongoose.connect(url, function(err) {
	if (err) throw err;
	console.log('MongoDB connected');
	
	app.listen(port, function(err) {
		if (err) throw err;
		console.log("App running on port: " + port);
	});
});
