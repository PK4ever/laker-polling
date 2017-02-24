angularApp
	.service("Medium", function($http) {
        var functions = {};
        this.sendToLogin = function() {
            return $http.post("api/i/medium/login").
                then(function(response) {
                    //success
                    //console.log("SUCCESS GETTING MEDIUM AUTH URL: " + JSON.stringify(response));
                    return response;
                }, function(response) {
                    console.log("Error retrieving Medium authtentication url: " + JSON.stringify(response));
                });
        }
        this.exchangeAuthCodeForAccessToken = function(authCode) {
            return $http.get("api/i/medium/exchange/" + authCode).
            then(function(response) {
                //success
                //console.log(JSON.stringify(response));
                return response;
            }, function(response){
                console.log("Error exchanging Medium auth code for token: " + JSON.stringify(response));
                if(response) {
                    var responseData = response.data;
                    alert(JSON.stringify(response))
                    if(responseData) {
                        var responseError = responseData.error;
                        if(responseError && responseError.contains("An access token is required")) {
                            alert("Your authcode is expired. Please try to log in with medium again.");
                            //send the user back home to try again because we need the tokens for the app to work
                            window.location = "/";
                        }
                    }
                }
                return response;
            });
        }

        functions.sendToLogin = this.sendToLogin;
    })