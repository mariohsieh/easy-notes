module.exports = function(app, Note) {

	// helper function to format date/time for ID use
	function getId(postDate) {

		var today = new Date(postDate);	
		
		function addZero(num) {
			if (num < 10)
				return "0" + num;
			else
				return num.toString();
		}
		
		var mm = addZero(today.getMonth()+1);
		var dd = addZero(today.getDate());
		var hh = addZero(today.getHours());
		var min = addZero(today.getMinutes());	
		var ss = addZero(today.getSeconds());	

		var todayDate = today.getFullYear().toString() + mm + dd + hh + min + ss;
				
		return todayDate;
	}	


	//// routes definition ******************************
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
			
			var reqBody = req.body;
			//console.log(reqBody);
			
			var id = getId(reqBody.date);
			//console.log(id);

			// set up object for submission
			var noteObj = {
				_id: 				id,
				title: 			reqBody.title,
				content: 		reqBody.content,
				color: 			reqBody.color,
				created: 		reqBody.date
			}
			var note = new Note(noteObj);
		
			// save to database
			note.save(function(err,doc) {
				if (err || !doc)
					throw err;
				else {
					console.log(doc);
					//res.json(doc);
					res.send("new note added!");
				}
			});

		});

	app.route('/api/notes/:noteId')
		
		.put(function(req,res,next) {
			//console.log(req.params.noteId);
			var reqBody = req.body;

			// find document by ID
			Note.findById(req.params.noteId, function(err,doc) {
				if (err || !doc) throw err;
				
				// update all entries
				doc.title = reqBody.title;
				doc.content = reqBody.content;
				doc.color = reqBody.color;
				doc.updated = reqBody.date;
				
				// save into db
				doc.save(function(err,doc) {
					if (err || !doc) throw err;
					else {
						console.log(doc);
						res.send("note updated!");
					}
						
				});
			});
		})
		
		.delete(function(req,res,next) {
			//console.log(req.params.noteId);

			Note.remove({ _id: req.params.noteId }, function(err,doc) {
				if (err || !doc) throw err;
				else {
					console.log(doc);
					res.send("note successfully deleted.");
				}
				
			});
			
		});		
		

}
















