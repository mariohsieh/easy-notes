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
			controller: function($scope, Note) {
				var note = new Note;
				
				$scope.addNote = function(data) {
					$scope.newNote.date = new Date();
					console.log($scope.newNote);
					note.addNote($scope.newNote)
						.success(function(data) {
							console.log("new note added!", data);
							$scope.initial();
						})
						.error(function() {
							console.log("Error in new note submission");
						});
						
				}			
			},
			templateUrl: 'views/add-note.html'
		}
	});
	
	
	
	
