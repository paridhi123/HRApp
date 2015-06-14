/* Controller for a section in the index.html screen (top navigation menu section)
 * On click of the sign out link, clears the stored cookie with the logged in user's information
 * */
hrApp.controller('appController', function($scope, $cookieStore){
	$scope.signout = function(){
		$cookieStore.remove('user');
	};
});