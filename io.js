// all socket.io code
module.exports = function(io,Note) {

	// when a client connects
	io.on('connection', function(socket) {

		// helper functions //
		function getAllNotes() {
			Note.find(function(err,doc) {
				if (err) throw err;
				socket.emit('getAllNotes', doc);
			});
		}
		
		// on inital connect
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

			console.log(note);	// log new note
			
			// save into mongodb
			note.save(function(err,doc) {
				if (err || !doc) throw err;
				console.log('creation success!');
				getAllNotes();
			});
		});	
	});
	
}
