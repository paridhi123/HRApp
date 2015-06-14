/* Service for implementations of Delete and Post requests to the server.
 * These requests are simulated for demo purposes. The service can be injected in any of the controllers
 * through dependency injection and the respective functions can be called.
 * */
hrApp.service('employeeApiService', function($http){
	console.log('inside the employee API service');
	 return({
         removeEmployee: removeEmployee,
         addEmployee: addEmployee
     });
	 
	 /* Implementation of the delete request. In the actual implementation the server must be configured to accept
	  * the employee details like name or ID, match them in the database and delete the entry and send a fresh list back 
	  * to the client. 
	  * Here I have just simulated Delete request by returning a success status code to demo the working.
	  * If the call goes through, the client receives a Response status code of 204.
	  * */
	 function removeEmployee(id) {
         var request = $http({
             method: "delete",
             url: "http://private-62ba2-empdirectory1.apiary-mock.com/employee/1",
             params: {
                 action: "delete"
             },
             data: {
                 id: id
             }
         });
         return( request.then( function(response){console.log("Success Delete with Status: " + response.status);}, function(){console.log("failure delete");} ) );
     };
     
	 /* Implementation of the post request. In the actual implementation the server must be configured to accept
	  * the employee details like name or ID, Add/Update the entry and send a fresh list back to the client. 
	  * Here I have just simulated the Add/Edit request by returning a success status code to demo the working.
	  * If the call goes through, the client receives a Response status code of 201.
	  * */
	 function addEmployee(newEmp) {
		 console.log('Inside addEmployee > employee to be added or updated:  ' + JSON.stringify(newEmp));
		 var request = $http({
		 method: "post",
		 url: "http://private-62ba2-empdirectory1.apiary-mock.com/employee/1",
		 params: {
		 action: "add"
		 },
		 data: {  
		        "id":33,
		        "name": newEmp.name,
		        "title": newEmp.title,
		        "location": newEmp.location,
		        "email": newEmp.email,
		        "phone": [
		            {
		                "type": newEmp.typeM,
		                "number": newEmp.mobile
		            }, {
		            	"type": newEmp.typeH,
		                "number": newEmp.home
		            }, {
		            	"type": newEmp.typeW,
		                "number": newEmp.work
		            }]
		 }
		 });
		  
		 return( request.then( function(response){console.log("Success Post with Status: " + response.status);}, function(){console.log("failure post");} ) );
 
		 };		 
	 
});