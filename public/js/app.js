angular.module("easyNotesApp", [])

	.controller("mainCtrl", function($scope) {

		//// socket io ////
		var socket = io(); 		// initialize socket.io	
		socket.on('getAllNotes', function(data) {
			$scope.allNotes = data;
			console.log($scope.allNotes);
		});			
		
		//// helper functions ////
		function initial() {
			$scope.newNote = true;
		}
		
		//// $scope functions ////
		// create a new note
		$scope.createNote = function(data) {
			socket.emit('createNote', data);
			$scope.newNote = {};
		}

		initial();
	
	});
