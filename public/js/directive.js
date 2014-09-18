angular.module("directives", [])

	.directive("addNote", function() {
/*
		function link(scope, elem, attr) {
			console.log(attr, elem);
		}
*/
		return {
			//link: link,
			restrict: 'E',
			replace: true,
			controller: function($scope, Note, $location) {
				var note = new Note;
				
				$scope.addNote = function(data) {
					$scope.newNote.date = new Date();
					console.log($scope.newNote);
					note.addNote($scope.newNote)
						.success(function(data) {
							console.log("new note added!", data);
							$location.path("/");
							$scope.initial();
						})
						.error(function() {
							console.log("Error in new note submission");
						});
						
				}			
			},
			templateUrl: 'views/partials/add-note.html'
		}
	})

	.directive("editNote", function() {
		
		return {
			restrict: 'E',
			replace: true,
			controller: function($scope, Note, $location) {
				var note = new Note;
				
				$scope.editNote = function(data) {
					$scope.current.date = new Date();
					console.log($scope.newNote);
					note.editNote($scope.current)
						.success(function(data) {
							console.log("updated note!", data);
							$location.path("/");
							$scope.initial();
						})
						.error(function() {
							console.log("Error in updating note.");
						});
				}		
			}
		}
	});
	
/*	
	.directive("editTitle", function() {
	})
	
	.directive("editContent", function() {
	});
*/	
	
