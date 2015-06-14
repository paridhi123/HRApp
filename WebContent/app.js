// inject all the required modules - dependency injection
var hrApp = angular.module('hrApp', ['ngRoute', 'ngResource', 'infinite-scroll', 'ngCookies']);

// route configurations for all the paths
// templateUrl - template to load on the respective path
// controller - call to the respective controllers - residing in separate files
hrApp.config(function($routeProvider){	
	$routeProvider
		.when('/',{
			templateUrl: "views/home.htm",
			controller: "mainController"
		})
		.when('/login',{
			templateUrl: "views/login.html",
			controller: "loginController"		
        })
        .when('/edit',{
			templateUrl: "views/edit.html",
			controller: "mainController"		
        })
		.otherwise({
			redirectTo: '/'
		});	
});


