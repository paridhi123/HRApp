hrApp.service('employeeApiService', function($http){
	console.log('inside the employee API service');
	 return({
         removeEmployee: removeEmployee,
         addEmployee: addEmployee,
         updateEmployeeDetails: updateEmployeeDetails
     });
	 
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
         return( request.then( function(){console.log("success delete");}, function(){console.log("failure delete");} ) );

//         return( request.then( handleSuccess, handleError ) );

     };
	 
	 function addEmployee(newEmp) {
		 console.log('inside addEmployee ' + JSON.stringify(newEmp));
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
		  
		 return( request.then( function(){console.log("success post");}, function(){console.log("failure post");} ) );
 
		 };
		 
		 function updateEmployeeDetails(uEmp){
			 var request = $http({
				 method: "post",
				 url: "http://private-62ba2-empdirectory1.apiary-mock.com/employee/1",
				 params: {
				 action: "add"
				 },
				 data: {  
				        "id":uEmp.id,
				        "name": uEmp.name,
				        "title": uEmp.title,
				        "location": uEmp.location,
				        "email": uEmp.email,
				        "phone": [
				            {
				                "type": uEmp.phone[0].type,
				                "number": uEmp.phone[0].number
				            }, {
				            	"type": uEmp.phone[1].type,
				                "number": uEmp.phone[1].number
				            }, {
				            	"type": uEmp.phone[2].type,
				                "number": uEmp.phone[2].number
				            }]
				 }
				 });
				  
				 return( request.then( function(){console.log("success edit post");}, function(){console.log("failure edit post");} ) );
		 
		 }
	 
});