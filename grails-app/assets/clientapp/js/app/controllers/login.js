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
                    if(response.status == 'failure') return onFail(response)
                    NProgress.done()
                    
                    const responseData = response.data
                    var user = new User(responseData.accessToken, responseData.user);
                    if(user.saveAsCurrent()) {
                        alert("Logged in as " + user.getName())
                        $window.location.href = '/dashboard'
                    } else {
                        //failed
                        alert("Logged in failed.")
                    }
                }, onFail)

            function onFail(response) {
                NProgress.done();
                alert("Error Logging In: " + (response && response.messages || "unknown error."))
            }
        }
        window.onGoogleSignIn = onGoogleSignIn;

        if(window.tempdata == undefined) {
            gapi.signin2.render('gsignin', {
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': window.onGoogleSignIn
            });
            window.tempdata = true;
        }

    })