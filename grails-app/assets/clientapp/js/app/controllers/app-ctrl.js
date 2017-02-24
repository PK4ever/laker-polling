angularApp
	.controller('AppCtrl', function AppCtrl($scope, $window, $location, $timeout, GoogleService, Stats, Stats) {
		$scope.currentUser = User.getCurrent();

        $scope.loginGoogler = function(e) {
            preventDefaultClickEvent(e)
            loginGoogler({ scope: $scope, window: $window, location: $location, Google: Google }, {})
        }

        function preventDefaultClickEvent(e) {
            debugger
            if(e) e.preventDefault();
        }
    })