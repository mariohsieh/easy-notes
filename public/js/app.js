angular.module("easyNotesApp", [])

	.controller("mainCtrl", ['$scope', function($scope) {

		//// helper functions ////
		function initial() {
			$scope.newNote = true;
		}
		
		//// $scope functions ////
		// create a new note
		$scope.createNote = function(data) {
			$scope.newNote = {};
		}

		//initial();
	
	}]);
