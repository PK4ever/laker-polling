angularApp
	.service("Notifications", function($http) {
        var functions = {};

        this.getUserNotes = function(refresh) {
            NProgress.start();
            var currentUser = User.getCurrent();
            if(currentUser){
                var currentUserId = currentUser.getId();
                if(currentUserId) {
                    //send REST request to our app to fetch all the editors
                    return $http.get("api/i/notifications", {params:{"userId": currentUserId}}).
                        //wait for response and then do something
                        then(function(response) {
                            //action was successful
                            console.log("Found all notifications associated with " + currentUserId + " " + JSON.stringify(response));
                            
                            NProgress.done();
                            return response;
                        }, function(response) {
                            //action failed
                            console.log("Error finding user's notifications: " + JSON.stringify(response));
                            NProgress.done();
                        });
                } else {
                    console.log("Error getting user's notifications: No current user id or access token.");
                    NProgress.done();
                    return null;
                }
            } else {
                console.log("No current user...");
                window.location.href = "/";
            }
        }        
    })