angular.module("directives", [])

	.directive("addNote", function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/add-note.html'
		}
	});
	
	
	
	
