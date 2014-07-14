angular.module("easynotesApp", [])


	.factory("Notes", function($http) {
		return {
			
			get: function() {
				return $http.get('/api/notes');
			},
			
			create: function(noteData) {
				return $http.post('/api/notes', noteData);
			}
		}
	})

	.controller("mainCtrl", function($scope, Notes) {

		// declare variables
		$scope.note = {};
		
		// get all notes from database
		$scope.getAllNotes = function() {

			Notes.get()
				.success(function(data) {
					console.log(data);
					$scope.data = data;
				})
				.error(function(data) {
					console.log("error, could not retrieve data");
				});
		}
		
		// create a new note
		$scope.createNote = function(data) {
			console.log(data.content);
			
			Notes.create(data)
				.success(function() {
					console.log('submission ok!');
				})
				.error(function() {
					console.log('error, could not submit');
				});
		}
		
		
	});
