// The service can be injected in any of the controllers through dependency injection.

hrApp.service('empDetailsService', function(){
	
	// empSelected object is initialized for saving the details of the presently selected employee
	// and presenting then in the edit screen.
	this.empSelected={};
});