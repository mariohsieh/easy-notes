angular.module("directives", [])

	// show note //
	.directive("showNote", function() {
		
		function link(scope, elem, attr) {
			
			//console.log(elem);

			function handleDragStart(e) {
				//console.log(this);
				this.style.opacity = '0.5';
				//elem.css("opacity", "0.5");
			}
			
			function handleDragEnter(e) {
				//console.log(this);
				this.classList.add('dragOver');
			}

			function handleDragLeave(e) {
				//console.log(this);
				this.classList.remove('dragOver');
			}
			
			elem.on("dragstart", handleDragStart);
			var dropArea = document.getElementById("dropArea");
			dropArea.addEventListener("dragenter", handleDragEnter);
			dropArea.addEventListener("dragleave", handleDragLeave);
		}

		return {
			link: link,
			//replace: true,
			restrict: 'A',
/*			
			controller: function() {

				//// draggable code ////
				function handleDragStart(e) {
					this.style.opacity = '0.4';
				}
				
				var note = document.querySelector('.noteBg');
				//var note = document.querySelector('.deleteArea p');
				console.log(note);
/*				
				[].forEach.call(note, function(note) {
					note.addEventListener('dragstart', handleDragStart, false);
				});
			},
*/	
			template: [
				"<div class='noteBg pointer' draggable='true' ui-sref='edit({ noteId: {{note._id}} })' ng-click='editDetails(note)'>",
					"<p>{{note.title}}</p>",
					"<p>{{note.content}}</p>",
				"</div>"
			].join('')
		}
	})


	// add note //
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


	// show note //
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
	})
	
	
	// note color //
	.directive("noteColor", function() {
		return {
			restrict: 'E',
			replace: true,
			controller: function($scope) {
				$scope.colors = ["green", "blue", "red"];
			},
			templateUrl: 'views/partials/note-color.html'
		}
	});
	
/*	
	.directive("editContent", function() {
	});
*/	
	
