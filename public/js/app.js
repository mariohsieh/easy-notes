angular.module("easyNotesApp", [
	"factories",
	"directives",
	"ui.router"
	])

/*
	.config(["$stateProvider", "$locationProvider", function($routeProvider, $locationProvider) { 
		$stateProvider
		 
		 
		$locationProvider.html5Mode(true);	// removes the # from URL address bar
	}
*/ 

	.controller("mainCtrl", ['$scope', 'Note', function($scope, Note) {
		
		// call Note factory		
		var note = new Note;

		// run on page load
		function initial() {
			
			$scope.newNoteToggle = false;

			getAllNotes();
		}

		//// helper functions ////
		// gets all notes to display
		function getAllNotes() {

			note.getAll()
				.success(function(data)  {
					console.log(data);
					$scope.allNotes = data;
				})
				.error(function() {
					console.log("Error in retrieving notes");
				});			
		}
				
		//// $scope functions ////
		// create a new note
		$scope.addNote = function(data) {
			//if (data != null) {
				note.addNote($scope.newNote)
					.success(function(data) {
						console.log("new note added!", data);
					})
					.error(function() {
						console.log("Error in new note submission");
					});
			//}
		}

		initial();
	
	}]);



