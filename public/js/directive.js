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
					//console.log($scope.newNote);
					note.addNote($scope.newNote)
/*					
						.success(function(data) {
							console.log("new note added!", data);
							$location.path("/");
							$scope.initial();
						})
						.error(function() {
							console.log("Error in new note submission");
						});
*/						
						.then(function(data) {
							console.log(data);
							$location.path("/");
							$scope.initial();							
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
			scope: {
				current: '='
			},
			controller: function($scope, Note, $location) {
				var note = new Note;
				
				$scope.editNote = function(data) {
					//console.log(data);
					$scope.current.date = new Date();
				
					// send updated info to backend
					note.updateNote($scope.current)
						.then(function(data) {
							console.log(data);
							$location.path("/");					
						});
				}
				// reset title and content if cancel out
				$scope.cancelEdit = function() {
					$scope.current.title = $scope.current.pTitle;
					$scope.current.content = $scope.current.pContent;
				}
					
			},
			templateUrl: 'views/partials/edit-note.html'
		}
	});
	
/*	
	.directive("editTitle", function() {
	})
	
	.directive("editContent", function() {
	});
*/	
	
