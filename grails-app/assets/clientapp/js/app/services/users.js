angularApp
    /* An AngularJS service generates an object that can be used 
    by the rest of the application. Our service acts as the 
    client-side wrapper for all of our API endpoints.
    */
    //a service to run tasks for manipulating editors
    .service("UserService", function($http) {
        var functions = {};
        //gets all the pubs that are being advertised
        this.authGoogleUser = function(idToken) {
            //send REST request to our app to fetch all the editors
            return $http.post("/api/user/auth?idToken=" + idToken, { idToken: idToken })
                //wait for response and then do something
                .then(function(response) {
                    return response.data;
                }, function(response) {
                    debugger
                    return response
                });
        }
    })