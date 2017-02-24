angularApp
    /* An AngularJS service generates an object that can be used 
    by the rest of the application. Our service acts as the 
    client-side wrapper for all of our API endpoints.
    */
    //a service to run tasks for manipulating editors
    .service("UserService", function($http) {
        this.getAllCourses = function() {
            //send api request
        }
    })