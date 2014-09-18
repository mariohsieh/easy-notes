angular.module("factories", [])
	
	.factory("Note", function($http) {
		
		return function() {
			
			this.getAll = function() {
				return $http.get('/api/notes');
			}
							
			this.addNote = function(noteData) {
				return $http.post('/api/notes', noteData);
/*				
				return $http({
					method	: 'POST',
					url			: '/api/notes', 
					//data		: $.param(noteData),
					data		: noteData,
					headers	: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
*/ 
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
	
