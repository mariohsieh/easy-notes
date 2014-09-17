angular.module("factories", [])
	
	.factory("Note", function($http) {
		
		return function() {
			
			this.getAll = function() {
				return $http.get('/api/notes');
			}
							
			this.addNote = function(noteData) {
				return $http.post('/api/notes', noteData);
			}
/*
			this.updateNote = function() {

			}
			* 
			this.deleteNote = function() {

			}
			
*/			
		}
		
	});
	
