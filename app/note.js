var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
	_id:			String,
	title: 		String,
	content: 	String,
	date:			Date
});

// create Note model from schema
//var Note = mongoose.model("Note", noteSchema);

// export model from schema
module.exports = mongoose.model("Note", noteSchema);
