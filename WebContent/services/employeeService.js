// The service can be injected in any of the controllers through dependency injection.
hrApp.service('employeeService', function(){
	// employee variable is initialized that is presented on the main screen by ng-repeat
	this.employee = "";
});