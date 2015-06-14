'use strict';

/*
 * controller for the login screen
 * 1. sets the default HR username/password to "admin"
 * In the actual application the username password will be confirmed with the server 
 * with the help of access token.
 * 2. Sets a browser cookie with the logged in user's information
 * 3. Redirects the path to the home screen if login is successful
 * 4. Presents an error alert if login is unsuccessful
 * */
hrApp.controller('loginController', function ($scope, $location, $cookieStore, $rootScope) {
	$scope.username;
	$scope.password;
	$scope.login = function(form){
	 if($scope.username == "admin" && $scope.password == "admin")
	  {
		 alert('Login Successful!');
		 $rootScope.globals = {
			currentUser:{
				name: $scope.username,
				 role: 'hr'
			}
		 };
		 
		 $cookieStore.put('user', $rootScope.globals);
		 $location.path('/');
	  }
	 else
	 {
	   alert("Invalid Password or Username..");
	  }
	};
});
