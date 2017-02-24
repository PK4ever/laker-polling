angularApp
	.controller('AppCtrl', function AppCtrl($scope, $window, $location, $timeout, GoogleService, Stats, SocketIO, Stats) {
		$scope.currentUser = User.getCurrent();
        $scope.$on('socket:numConnectedClients', function(event, payload) {
            //console.log("Got " + event.name + " Message: " + JSON.stringify(data.payload))
            var num = payload.data || 1;
            $scope.numActiveClients = num + " Active Viewers";
        });

        $scope.loginGoogler = function(e) {
            preventDefaultClickEvent(e)
            loginGoogler({ scope: $scope, window: $window, location: $location, Google: Google }, {})
        }

        function preventDefaultClickEvent(e) {
            debugger
            if(e) e.preventDefault();
        }
    })