module.exports = function(mongoose) {
	
	var noteSchema = new mongoose.Schema({
		_id:			String,
		title: 		String,
		content: 	String,
		date:			Date
	});

	// export model from schema
	return mongoose.model("Note", noteSchema);
}
