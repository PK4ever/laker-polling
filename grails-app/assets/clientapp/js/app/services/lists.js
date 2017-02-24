angularApp
    /* An AngularJS service generates an object that can be used 
    by the rest of the application. Our service acts as the 
    client-side wrapper for all of our API endpoints.
    */
    //a service to run tasks for manipulating editors
    .service("Lists", function($http) {
        var functions = {};

        this.startNewList = function(listInfo) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.post(endpoint, listInfo)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.addNewItem = function(listId, newItem) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/item"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.post(endpoint, newItem)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                });
        }

        this.updatePrivacy = function(listId, privacy) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            return $http.put(endpoint, { privacy: privacy })
                .then(function(response){
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.updateById = function(listId, updateData) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            return $http.put(endpoint, updateData)
                .then(function(response){
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.updateItemById = function(listId, itemId, updateData) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/item/" + itemId
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.put(endpoint, updateData)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.loadMoreLists = function(pagingParams) {
            NProgress.start();
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/public"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            if(pagingParams) {
                endpoint += "&limit=" + pagingParams.getLimit()
                endpoint += "&from=" + pagingParams.getFrom()
            }

            return $http.get(endpoint)
                .then(function(response) {
                    NProgress.done();
                    return response.data
                }, function(response) {
                    debugger
                    //action failed
                    NProgress.done();
                    return response
                });
        }

        this.loadMoreUserLists = function(userId, pagingParams) {
            NProgress.start();
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var bpa = false
            if(!currentUserAccessToken) bpa = true

            var endpoint = "/api/i/user/" + userId + "/v/lists"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            endpoint += "&bpa=" + bpa

            if(pagingParams) {
                endpoint += "&limit=" + pagingParams.getLimit()
                endpoint += "&from=" + pagingParams.getFrom()
            }
            
            return $http.get(endpoint)
                .then(function(response) {
                    debugger
                    NProgress.done();
                    return response.data
                }, function(response) {
                    debugger
                    //action failed
                    NProgress.done();
                    return response
                });
        }

        this.loadMoreItems = function(listId, pagingParams) {
            NProgress.start();
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var bpa = false
            if(!currentUserAccessToken) bpa = true

            var endpoint = "/api/i/list/" + listId + "/v/items"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            if(pagingParams) {
                endpoint += "&limit=" + pagingParams.getLimit()
                endpoint += "&from=" + pagingParams.getFrom()
            }
            endpoint += "&bpa=" + bpa

            return $http.get(endpoint)
                .then(function(response) {
                    NProgress.done();
                    return response.data
                }, function(response) {
                    debugger
                    //action failed
                    NProgress.done();
                    return response
                });
        }

        this.getListById = function(pubId) {
            NProgress.start();
            /*AS OF 042016, although we don't care if the user is logged in here, 
            if it is logged it, we want to send its id to the server for functional use*/
            var currentUser = User.getCurrent();
            if(currentUser) {
                var currentUserId = currentUser.getId();
                var currentUserAccessToken = currentUser.getAccessToken();
            }

            //send REST request to our app to fetch all the editors
            return $http.get("/api/i/lists/" + pubId, {params:{ "userId": currentUserId, "accessToken": currentUserAccessToken }}).
                //wait for response and then do something
                then(function(response) {
                    //action was successful
                    //console.log(JSON.stringify(response));
                    var pubs = response.data.pub;

                    NProgress.done();
                    return response;
                }, function(response) {
                    //action failed
                    NProgress.done();
                    return response
                });
        }

        this.getListBySlug = function(listSlug) {
            NProgress.start();
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var bpa = false
            if(!currentUserAccessToken) bpa = true

            var endpoint = "/api/i/list/v/urlSlug/" + listSlug
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            endpoint += "&bpa=" + bpa
            //send REST request to our app to fetch all the editors
            return $http.get(endpoint, {params:{}}).
                //wait for response and then do something
                then(function(response) {
                    //action was successful
                    //console.log(JSON.stringify(response));
                    NProgress.done();
                    return response.data;
                }, function(response) {
                    //action failed
                    NProgress.done();
                    return response
                });
        }
        
        this.addUserAsContributor = function(listId, userId) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/relation/contributor/" + userId
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.post(endpoint)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.addUserAsWatcher = function(listId) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/relation/watcher"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.post(endpoint)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.removeUserAsContributor = function(listId, userId) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/relation/contributor/" + userId
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.delete(endpoint)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.deleteById = function(listId) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod"
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            return $http.delete(endpoint)
                .then(function(response){
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.deleteItemById = function(listId, itemId) {
            NProgress.start();
            //console.log("Sending request to advertise pub for writers: " + pub.id);
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/list/" + listId + "/mod/item/" + itemId
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken
            
            return $http.delete(endpoint)
                .then(function(response){
                    debugger
                    NProgress.done()
                    //console.log("SUCCESS advertising: " + JSON.stringify(response));
                    return response.data;
                }, function(response){
                    debugger
                    NProgress.done()
                    console.log("Error start new list: " + JSON.stringify(response));
                    return response.error
                });
        }

        this.searchByKeywords = function(keywords) {
            NProgress.start();
            var currentUser = User.getCurrent();
            var currentUserAccessToken = currentUser && currentUser.getAccessToken();
            var endpoint = "/api/i/search/list/" + keywords
            endpoint += "?" + SERVER_API_KEY_PARAM
            endpoint += "&accessToken=" + currentUserAccessToken

            return $http.get(endpoint)
                .then(function(response) {
                    NProgress.done();
                    return response.data
                }, function(response) {
                    debugger
                    //action failed
                    NProgress.done();
                    return response
                });
        }
    })