//// modules *************************************
var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	http = require('http').Server(app),
	io  = require('socket.io')(http);


//// configuration *******************************
var port = process.env.PORT || 9090,			// set port
	url = 'mongodb://localhost/easynotes';		// for localhost

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});


//// db interaction ******************************
// schema definition
var noteSchema = new mongoose.Schema({
	title: 		String,
	content: 	String
});

// create Note model from schema
var Note = mongoose.model("Note", noteSchema);


//// routes **************************************
app.get('/', function(req,res) {
	res.sendfile('./public/index.html');
	//res.send('holla');
});


//// socket.io ***********************************
require('./io')(io, Note);


//// start application ***************************
mongoose.connect(url, function(err) {
	if (err) throw err;
	console.log('MongoDB connected');	
	
	http.listen(port, function(err) {
		if (err) throw err;
		console.log("App running on localhost: " + port);				
	});
});
