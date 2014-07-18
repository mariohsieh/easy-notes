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

// model //
// move into its own file later
var noteSchema = new mongoose.Schema({
	title: 		String,
	content: 	String
});

// create Note model from schema
var Note = mongoose.model("Note", noteSchema);

// create a new note
app.post('/api/notes', function(req,res) {
	
	//console.log(req.body);
	
	var note = new Note({
		title: req.body.title,
		content: req.body.content
	});	

	console.log(note);
	note.save(function(err,doc) {
		if (err || !doc) throw err;
		console.log('submission success!');
		res.redirect('http://localhost:9090');
	});
	

});

// retrieve all notes
app.get('/api/notes', function(req,res) {
	
	Note.find(function(err,doc) {
		if (err) throw err;
		//console.log(doc);
		res.json(doc);
	});
});


//// routes **************************************
app.get('/', function(req,res) {
	
	res.sendfile('./public/index.html');
	//res.send('holla');
});


//// start application ***************************
mongoose.connect(url, function(err) {
	if (err) throw err;
	console.log('MongoDB connected');	
	
	http.listen(port, function(err) {
	if (err) throw err;
		console.log("App running on localhost: " + port);
	});
});


// socket.io events //
io.on('connection', function() {
	console.log('a user connected');
});

