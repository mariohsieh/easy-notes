angular.module("directives", [])

	.directive("addNote", function() {

		return {
			//link: link,
			restrict: 'E',
			replace: true,
			templateUrl: 'views/add-note.html'
		}
	});
	
	
	
	
