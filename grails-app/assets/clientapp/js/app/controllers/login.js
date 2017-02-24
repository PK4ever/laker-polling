angularApp
    //a controller to display the data to appropriately list views 
    // allows us to add data to the scope and access it from our views.
    .controller("LoginController", function($scope, $window, $location, $routeParams, $timeout, UserService, GoogleService) {
        NProgress.start()
        
        $scope.sendUserToGoogleLogin = function() {
            GoogleService.requestGoogleLoginAutUrl()
                .then((response) => {
                    const authUrl = response.data
                    $window.location.href = authUrl
                })
        }

        _handleOAuthResponse($scope, $window, $location, $routeParams, GoogleService)
        
        NProgress.done()
    })

    function _handleOAuthResponse($scope, $window, $location, $routeParams, GoogleService) {
        var urlParams = $window.location.search;
        console.log(JSON.stringify(urlParams));

        if(urlParams && urlParams.length > 0){
            try{
                //try to get the Medium.com authorization code from the url
                var googleAuthCode = urlParams.split("code=")[1];
            } catch (err) {
                console.log("could not find medium auth code: " + urlParams.split("code="));
            }
            if(googleAuthCode){
                var currentUser = User.getCurrent();
                if(currentUser) {
                    $window.location.href = "/profile";
                    return
                }

                var promise = Google.exchangeAuthCodeForAccessToken(googleAuthCode);
                if(promise) {
                    promise.then(function(response){
                        debugger
                        //console.log("[GenCallbackController] Google exchange response returned");
                        if(response.status == 200 && response.data 
                            && response.data.accessToken 
                            && response.data.accessToken.token 
                            && response.data.user) {
                            NProgress.start();
                            //console.log("[GenCallbackController] GOOGLE SUCCESSSS!: " + JSON.stringify(response));
                            var dbUser = response.data.user;
                            saveCurrentUserAfterLogin(response.data.accessToken.token, dbUser)
                            var currentUser = User.getCurrent();
                            debugger
                            if (!currentUser)  {
                                $window.location.href = "/";
                                return
                            }
                            
                            //send the user back to its page from root
                            //send the user back where they started or to the pubs page
                            var preLoginLocationPath = getCookie("preLogin_location_path")
                            debugger
                            $window.location.href = preLoginLocationPath && preLoginLocationPath + "?sm-src=login" || "/mine";
                            NProgress.done();
                        } else {
                            //the auth code was wrong or something went wrong behind the scenes.
                            //send the user to try again.
                            NProgress.start();
                            console.log("[GenCallbackController] ERROR: invalid auth code. sending user to try logging in again");
                            Google.sendToLogin().then(function(response) {
                                debugger
                                if(response){
                                    $window.location.href = response.data;
                                }
                                NProgress.done();
                            }, function(response) {
                                debugger
                                //something went wrong
                                console.log("[GenCallbackController] ERROR: " + response);
                                NProgress.done();
                                //send the user to the home page
                                $window.location.href = "/profile";
                            });
                        }
                    }, function(response){
                        //something went wrong
                        console.log("[GenCallbackController] Error: " + response);
                        NProgress.done();
                        //send the user to the home page
                        $window.location.href = "/profile";
                    });
                }
            } else {
                $window.location.href = "/profile";
            }
        } else {
            //$window.location.href = "/profile";
        }

        function saveCurrentUserAfterLogin(accessToken, dbUser) {
            //create the current user
            var user = new User(accessToken, dbUser._id || dbUser.id, dbUser.googlePersonId, dbUser.email, dbUser.username, dbUser.imageUrl);
            //set the current user
            User.setCurrent(user);
        }
    }