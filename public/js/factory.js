angular.module("factories", [])
	
	.factory("Note", ['$http', function($http) {
		
		return function() {
			
			this.getAll = function() {
				return $http.get('/api/notes');
			}
							
			this.addNote = function(noteData) {
				return $http.post('/api/notes', noteData);
			}

			this.updateNote = function(noteData) {
				return $http.put('/api/notes/:noteId', noteData);
			}

/* 
			this.deleteNote = function() {

			}		
*/			
		}
		
	}]);
	
