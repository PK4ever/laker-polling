angularApp
    //a controller to display the data to appropriately list views 
    // allows us to add data to the scope and access it from our views.
    .controller("LoginController", function($scope, $window, $location, $routeParams, $timeout, UserService) {
        function onGoogleSignIn(googleUser) {
            NProgress.start()
            const user = googleUser.getAuthResponse()
            const id_token = user.id_token
            UserService.authGoogleUser(googleUser.getAuthResponse().id_token)
                .then((response) => {
                    NProgress.done()
                    const responseData = response.data
                    //TODO(lincoln) change this to be just responseData.accessToken after jeff makes the change on server
                    var user = new User(responseData.accessToken || responseData.id, responseData.user);
                    if(user.saveAsCurrent()) {
                        alert("Logged in as " + user.getName())
                        $window.location.href = '/dashboard'
                    } else {
                        //failed
                        alert("Logged in failed.")
                    }
                }, (response) => {
                    NProgress.done();
                    alert("Error Logging In: " + response)
                })
        }
        window.onGoogleSignIn = onGoogleSignIn
    })