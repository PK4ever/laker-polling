angularApp
	.service("Stats", function($http) {
        var functions = {};

        this.record = function(event) {
            var endpoint = "api/i/stats/events"
            endpoint += "?" + SERVER_API_KEY_PARAM
            return $http.post(endpoint, event)
                .then(function(response){
                    console.info("Successfully recorded event:", event.type, event.tuid)
                    return response;
                }, function(response){
                    console.info("Failed to record event:", event.type, event.tuid)
                });
        }

        this.recordPageView = function(pageView) {
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            if(currentUser) pageView.viewerUserId = currentUser.getId()
            var endpoint = "/api/i/stat/pageView"
            endpoint += "?" + SERVER_API_KEY_PARAM

            return $http.post(endpoint, pageView)
                .then(function(response){
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        } 

        this.recordListItemClick = function(listItemClick) {
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            if(currentUser) listItemClick.actorAccessToken = currentUser.getAccessToken()
            var endpoint = "/api/i/stat/listItemClick"
            endpoint += "?" + SERVER_API_KEY_PARAM
            return $http.post(endpoint, listItemClick)
                .then(function(response){
                    return response.data;
                }, function(response){
                    debugger
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        } 

        this.recordListItemRating = function(listItemRating) {
            if(!listItemRating) return
            if(!listItemRating.itemId) return
            if(!listItemRating.rating) return
            var currentUser = User.getCurrent();
            if(!currentUser) return

            listItemRating.actorAccessToken = currentUser.getAccessToken()
            var endpoint = "/api/i/stat/listItemRating"
            endpoint += "?" + SERVER_API_KEY_PARAM
            return $http.post(endpoint, listItemRating)
                .then(function(response){
                    return response.data;
                }, function(response){
                    debugger
                    return response.error
                });
        }      
    })