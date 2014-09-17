angular.module("easyNotesApp", [
	"ui.router",
	"noteService"
	])

	.controller("mainCtrl", ['$scope', 'Note', function($scope, Note) {

		// run on page load
		function initial() {
			$scope.newNoteToggle = false;

			getAllNotes();
		}

		//// helper functions ////
		// gets all notes to display
		function getAllNotes() {
			// call Note factory
			var note = new Note;
			note.getAll()
				.success(function(data)  {
					console.log(data);
				})
				.error(function() {
					console.log("Error in retrieving notes");
				});			
		}
				
		//// $scope functions ////
		// create a new note
		$scope.addNote = function(data) {
			$scope.newNote = {};
		}

		initial();
	
	}]);




