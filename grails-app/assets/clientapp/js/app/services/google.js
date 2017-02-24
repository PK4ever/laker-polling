angularApp
	.service("GoogleService", function($http, $location) {
        this.requestGoogleLoginAutUrl = function(preLoginData) {
            const currentLocationUrl = $location.absUrl()
            const currentLocationPath = $location.path()
            
            setCookie("preLogin_location_url", currentLocationUrl)
            setCookie("preLogin_location_path", currentLocationPath)
            setCookie("preLogin_action_type", preLoginData && preLoginData["preLogin_action_type"])
            setCookie("preLogin_action_object_id", preLoginData && preLoginData["preLogin_action_object_id"])

            var endpoint = "/api/i/user/login/google/authURL"
            endpoint += "?" + SERVER_API_KEY_PARAM
            return $http.get(endpoint)
                .then(function(response) {
                    console.log("SUCCESS GETTING GOOGLE AUTH URL: " + JSON.stringify(response));
                    return response;
                }, function(response) {
                    alert("Error retrieving Google authtentication url: " + JSON.stringify(response));
                });
        }
        this.exchangeAuthCodeForAccessToken = function(authCode) {
            var endpoint = "/api/i/user/login/google"
            endpoint += "?" + SERVER_API_KEY_PARAM
            return $http.post(endpoint, {"code": authCode}).
            then(function(response) {
                return response;
            }, function(response){
                console.log("Error exchanging Google auth code for token: " + JSON.stringify(response));
                return response;
            });
        }
    })