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
					$scope.allNotes = data;
				})
				.error(function() {
					console.log("Error in retrieving notes");
				});			
		}
				
		//// $scope functions ////
		// create a new note
		$scope.addNote = function(data) {
			//$scope.newNote = {};
			console.log("hi");
		}

		initial();
	
	}]);



