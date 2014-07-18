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

// db interaction ***********************************
// model // (move into its own file later)
var noteSchema = new mongoose.Schema({
	title: 		String,
	content: 	String
});

// create Note model from schema
var Note = mongoose.model("Note", noteSchema);

// get all notes from db
/*
function getAllNotes() {
	Note.find(function(err,doc) {
		if (err) throw err;
		data = doc;
	});
	console.log(data);
}*/



// socket.io events //
io.on('connection', function(socket) {

	function getAllNotes() {
		Note.find(function(err,doc) {
			if (err) throw err;
			socket.emit('initial', doc);
		});
	}
	
	// on connect
	console.log('a user connected');
	getAllNotes();
	
	
	// on note creation
	socket.on('createNote', function(data) {
		//console.log(data);
		
		// create instane of note model
		var note = new Note({
			title: data.title,
			content: data.content
		});	

		console.log(note);
		
		// save into mongodb
		note.save(function(err,doc) {
			if (err || !doc) throw err;
			console.log('submission success!');
		});		
	});	
	
});


	
	
	
