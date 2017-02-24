angularApp
    .controller("ForumController", function($scope, $window, $routeParams, Chat, Google, SocketIO, currentUser){
        $scope.currentUser = currentUser;
        if(!currentUser) $scope.isLoggedOutUser = true

        //accept and receive messages for the forum
        SocketIO.forward('forum-message');
        $scope.$on('socket:forum-message', function(event, data) {
            var payload = data.payload;

            if (payload && payload.userId != $scope.currentUser.getId()) {
                $scope.pushMessage(payload.message);
            }
        });

        $scope.loginGoogler = function() {           
            NProgress.start();

            Google.sendToLogin().then(function(response) {
                if(response){
                    //data binding not working
                    $scope.loginStatus = "Redirecting to Google.com to login ...";
                    $window.location.href = response.data;
                }
                NProgress.done();
            }, function(response) {
                //something went wrong
                console.log("[$scope.loginGoogler] ERROR:" + response);
                $scope.loginStatus = response;
                NProgress.done();
            });
        }
    })