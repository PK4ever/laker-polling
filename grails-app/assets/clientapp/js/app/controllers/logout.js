angularApp	
	//a controller to capture the user's action for new editor form
    .controller("LogoutController", function($scope, $location, $window) {
        User.logoutCurrent(function() {
            $window.location.href = "/"
        });        
    });