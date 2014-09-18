angular.module("controllers", [])

	.controller("mainCtrl", ['$scope', 'Note', function($scope, Note) {
		
		// call Note factory		
		var note = new Note;

		//// helper functions ////
		// gets all notes to display
		function getAllNotes() {

			note.getAll()
				.success(function(data)  {
					$scope.allNotes = data;
				})
				.error(function() {
					console.log("Error in retrieving notes");
				});			
		}

		//// scope functions ////
		
		$scope.editDetails = function(note) {
			$scope.current = note;
			// create copy for placholder text
			$scope.current.pTitle = note.title;
			$scope.current.pContent = note.content;
		}
		
		// run on page load
		$scope.initial  = function() {

			getAllNotes();
			
		}
		
		$scope.initial();

	}]);
