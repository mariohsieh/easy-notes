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
		
		// get the current date & time
		function getDate() {
			var today = new Date();
			console.log(today.getFullYear());
			var mm = addZero(today.getMonth()+1);
			
			var dd = addZero(today.getDate());
			 

			var hh = addZero(today.getHours());
			var min = addZero(today.getMinutes());	
			var ss = addZero(today.getSeconds());	

			var todayDate = today.getFullYear() + "-" + mm + "-" + dd + "-" + hh + min + ss;
			
			return todayDate;
		}				
		
		//// $scope functions ////
		// create a new note
		$scope.addNote = function(data) {
				$scope.newNote.date = getDate();
				console.log($scope.newNote);
				note.addNote($scope.newNote)
					.success(function(data) {
						console.log("new note added!", data);
					})
					.error(function() {
						console.log("Error in new note submission");
					});

		}

		initial();
	
		function addZero(num) {
			//num = num.toString();
			console.log(num);
			if (num < 10)
				return "0" + num;
			else
				return num;
		}


	}]);



