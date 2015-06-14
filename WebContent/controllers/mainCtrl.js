hrApp.controller('mainController', ['$scope', '$location', '$http', 'employeeService', 'employeeApiService', '$cookieStore', '$rootScope', 'empDetailsService', function($scope, $location, $http, employeeService, employeeApiService, $cookieStore, $rootScope, empDetailsService){
	
	// initialize the loading indicator
	$scope.loader = { 
			loading : false,
	};
	
	/* check if the cookie value is not undefined, then get the log in user's details from the cookie
	 * display the logged in user name on the main screen */
	if($cookieStore.get('user') !== undefined){
	$rootScope.LoggedUser = $cookieStore.get('user').currentUser.name;
	$rootScope.LoggedRole = $cookieStore.get('user').currentUser.role;
	console.log('inside main controller $cookieStore.get ' +  $cookieStore.get('user').currentUser.name);
	}
	
	/* watch for changes to the model object "employee" 
	 * the employee object is displayed on the main as well as edit screen
	 * object is initialized at the employeeService service */
	$scope.employee=employeeService.employee;
	$scope.$watch('employee', function(newValue, oldValue) {
		employeeService.employee = $scope.employee;
	});
	
	// empty array for storing fetched/filtered data page wise
	$scope.empList =[];
	var _page=0;

	
	/* 1. Get request for fetching employee details data from the Apiary API. 
	   2. On the success function concatenate the fetched data to the empty array
	      and stop the infinite scroll.
	   3. Keeping the get request in the main controller to simulate pagination scrolling
	      and end of data through local scope variable. We can also use rootScope variables 
	      and move the code to a separate service in the production application since we would
	      not have to simulate the end of pagination scroll */
	$scope.LoadDetails = function(){
	 	 // start loading spinner while waiting for the data to be fetched from the server
	 	 $scope.loader.loading = true;
		 $('#noRec').addClass('noDisplay');
	 	 
	 	 $http({
	        method: "get",
	        url: "http://private-62ba2-empdirectory1.apiary-mock.com/employee/1",
	        params: {
	            action: "get"
	        }
	    }).success(function(data){
	 	   $scope.empList = $scope.empList.concat(data);
	 	   _page = _page + 1;
	 	   
	 	   // For displaying number of the page being scrolled from fetched data
	 	   console.log("Page Number from the scroll: " + _page);	 	  
	 	   
	 	   // For stopping the infinite scroll (simulating the end of the fetched data)
	 	   if(data[_page].id > 3){
	 	   $scope.busyLoadingData = true;

	 	   }
	 	   
	 	  // stop loading indicator when data is fetched successfully 
	 	  $scope.loader.loading = false ;
		  $('#noRec').removeClass('noDisplay'); 
	    });
	};
 
	
	
	// Delete employee function, calls the implementation from the service
    $scope.removeEmp = function(empId) {
		employeeApiService.removeEmployee(empId);
    };

    /* Add employee function, calls the implementation from the service
     * Simulates the addition of a new employee to the DOM (only for the DEMO)
     * In actual application when a new employee is added the server will send a fresh list
     * and the view will be updated accordingly.
     */
    $scope.addEmpSubmit = function() {
    	// **START - only for demo > employee being added to the DOM
    	$('.newAddBtn').html('Employee Added');
    	$('.add').html('Close');
    	$scope.newEmployee={};
    	$scope.newEmployee.id = 30;
    	$scope.newEmployee.name = $('#empName').val();
    	$scope.newEmployee.title = $('#empTitle').val();
    	$scope.newEmployee.location = $('#empLocation').val();
    	$scope.newEmployee.email = $('#empEmail').val();
    	$scope.newEmployee.mobile = $('#empMobile').val();
    	$scope.newEmployee.home = $('#empHome').val();
    	$scope.newEmployee.work = $('#empWork').val();
    	$scope.newEmployee.typeM = 'mobile';
    	$scope.newEmployee.typeH = 'home';
    	$scope.newEmployee.typeW = 'work';
    	$("#mainBody").append('<tr id="addRow" ng-if=" $scope.newEmployee != undefined">'+
                '<td>'+$scope.newEmployee.id+'</td>'+
                '<td>'+$scope.newEmployee.name+'</td>'+
                '<td>'+$scope.newEmployee.email+'</td>'+
                '<td>'+$scope.newEmployee.title+'</td>'+
                '<td>'+$scope.newEmployee.location+'</td>'+
                '<td><ul>'+
                '<li>'+$scope.newEmployee.typeM+': '+ $scope.newEmployee.mobile+'</li>'	+
                '<li>'+$scope.newEmployee.typeH+': '+ $scope.newEmployee.home+'</li>'	+
                '<li>'+$scope.newEmployee.typeW+': '+ $scope.newEmployee.work+'</li>'	+
                '</ul></td>'+
                '<td ng-if="LoggedRole == \'hr\'"><a href="#/">Edit</a> | <a href="#/" ng-click="removeEmp(employee.id)">Delete</a></td>'+
        '</tr>');
    	// **END - only for demo > employee being added to the DOM
    	
    	employeeApiService.addEmployee($scope.newEmployee);
    };
    
    /* Edit screen changes 
     * 1. Watch for changes on the empSelected model which denotes the model for edit employee details
     * */
	$scope.empSelected=empDetailsService.empSelected;
	$scope.editScreen = function(editEmp){
		$scope.empSelected = editEmp;
	};

	$scope.$watch('empSelected', function(newValue, oldValue) {		
		empDetailsService.empSelected = $scope.empSelected;
	});
	
    /* Edit screen changes 
     * 2. Calls the implementation from the employeeApiService and pass the current employee object
     * 3. The implementation will copy the values to the edit screen and call a POST request 
     * */
	$scope.updateEmployee = function(updatedEmployee){
		employeeApiService.addEmployee(updatedEmployee);
	};
	

    /* Reset the input values in the Add Employee Form 
     * And return the form to its "pristine" state
     * */
    $scope.reset = function(){
    	$('#empName').val('');
    	$('#empEmail').val('');
    	$('#empTitle').val('');
    	$('#empLocation').val('');
    	$('#empMobile').val('');
    	$('#empWork').val('');
    	$('#empHome').val('');
    	$scope.addEmpForm.$setPristine();
    };
    

	// closes the sliding Add Employee Menu from the main Screen
	$scope.closeAddMenu = function(){
		if($('.add').html() == 'Close'){
			$('.add').html('Add New Employee');
			$('.newAddBtn').html('Add');	
		}
		$scope.reset();
	};

}]);
