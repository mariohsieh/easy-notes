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
	// initial page - delete when all notes are showing
	.get(function(req,res,next) {
		res.sendfile('./public/index.html');
	});

app.route('/api/notes')
	// get all notes
	.get(function(req,res,next) {
		Note.find(function(err,doc) {
			if (err) throw err;
			res.json(doc);
		});
	})
	.post(function(req,res,next) {
		console.log(req.body);
		var reqBody = req.body;
		var noteObj = {
			title: 		reqBody.title,
			content: 	reqBody.content
		}
		var note = new Note(noteObj);
		note.save(function(err,doc) {
			if (err || !doc)
				throw err;
			else
				res.json(doc);
		});
	});
	
	
//// start server ***************************
mongoose.connect(url, function(err) {
	if (err) throw err;
	console.log('MongoDB connected');
	
	app.listen(port, function(err) {
		if (err) throw err;
		console.log("App running on port: " + port);
	});
});
