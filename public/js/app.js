angular.module("easyNotesApp", [
	"controllers",
	"factories",
	"directives",
	"ui.router"
	])

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) { 

		$stateProvider
		
			.state('home', {
				url: '/',
				templateUrl: 'views/show-all-page.html'
			})
			
			.state('new', {
				url: '/new',
				templateUrl: 'views/add-note-page.html'
			})
						
			.state('edit', {
				url: '/:noteId',
				controller: function($scope, $stateParams) {

					//$scope.id = $stateParams.noteId;
					console.log($scope.current);

					//$scope.current = $stateParams.current;
					//console.log($stateParams.noteTitle);
				},
				templateUrl: 'views/edit-note-page.html'
			});
			
		$urlRouterProvider.otherwise('/');		 
		//$locationProvider.html5Mode(true);	// removes the # from URL address bar
	}]);



