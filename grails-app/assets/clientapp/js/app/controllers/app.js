angularApp
	.controller('AppCtrl', function AppCtrl($scope, $window, $location, $timeout) {
		$scope.currentUser = User.getCurrent();
    })