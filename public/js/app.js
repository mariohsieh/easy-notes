angular.module("easyNotesApp", [
	"ngSanitize",
	"factories",
	"directives",
	"ui.router"
	])

	.config(function($stateProvider, $urlRouterProvider, $locationProvider) { 

		$urlRouterProvider.otherwise('/');
				
		$stateProvider
		
			.state('home', {
				url: '/',
				templateUrl: 'views/show-all.html'
			})
/*
			.state(':id', {
				url: '/:id',
				templateUrl: 'views/new-note.html'
			})
*/
			.state('new', {
				url: '/new',
				templateUrl: 'views/new-note.html'
			});
		 
		//$locationProvider.html5Mode(true);	// removes the # from URL address bar
	})

	.controller("mainCtrl", ['$scope', 'Note', function($scope, Note) {
		
		// call Note factory		
		var note = new Note;

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

		//// scope functions ////
		// run on page load
		$scope.initial  = function() {
			
			$scope.newNoteToggle = false;

			getAllNotes();
		}
		
		$scope.initial();

	}]);



