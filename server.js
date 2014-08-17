//// modules *************************************
var express 				= require('express'),
		app 						= express(),
		morgan 					= require('morgan'),
		bodyParser 			= require('body-parser'),
		methodOverride 	= require('method-override'),
		mongoose 				= require('mongoose');


//// configuration *******************************
var port = process.env.PORT || 9090,					// set port
		url = 'mongodb://localhost/easynotes';		// for localhost

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


//// db interaction ******************************
// schema definition
var noteSchema = new mongoose.Schema({
	title: 		String,
	content: 	String
});

// create Note model from schema
var Note = mongoose.model("Note", noteSchema);


//// routes **************************************
app.route('/')
	.get(function(req,res,next) {
		res.sendfile('./public/index.html');
	});


//// start server ***************************
mongoose.connect(url, function(err) {
	if (err) throw err;
	console.log('MongoDB connected');
	
	app.listen(port, function(err) {
		if (err) throw err;
		console.log("App running on localhost: " + port);
	});
});
