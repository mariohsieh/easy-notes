angular.module("noteService", [])
	
	.factory("Note", function($http) {
		
		return function() {
			
			this.getAll = function() {
				return $http.get('/api/notes');
			}
/*							
			this.addNote = function(noteData) {

				return $http.post('/api/brackets', noteData);
			}

			this.updateNote = function() {

			}
			* 
			this.deleteNote = function() {

			}
			
*/			
		}
		
	});
	
