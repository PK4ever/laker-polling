angularApp
    .config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
        //the routeProvider module helps us configure routes in AngularJS.
        $routeProvider
            .when("/login", {
                //the url to the template for this view
                templateUrl: "/assets/views/login.html",
                //the controller of this view
                controller: "LoginController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        var currentUser = User.getCurrent();
                        if(currentUser){
                            redirectTo: "/profile";
                        }
                        return
                    }
                }
            })
            //when the user navigates to the root, index of our app
            .when("/profile", {
                //the url to the template for this view
                templateUrl: " ",
                //the controller of this view
                controller: "ProfileController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        }
                        if(currentUser.type == 'student') {
                            redirectTo: '/profile/student'
                        } else if (currentUser.type == 'teacher') {
                            redirectTo: '/profile/teacher'
                        } else if (currentUser.type == 'admin') {
                            redirectTo: '/profile/admin'
                        } else {
                            redirectTo: '/logout'
                        }
                    }
                }
            })
            .when("/profile/student", {
                //the url to the template for this view
                templateUrl: "views/student-profile.html",
                //the controller of this view
                controller: "StudentProfileController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        }
                        return currentUser
                    }
                }
            })
            .when("/profile/teacher", {
                //the url to the template for this view
                templateUrl: "views/student-profile.html",
                //the controller of this view
                controller: "TeacherProfileController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        }
                        return currentUser
                    }
                }
            })
            .when("/profile/admin", {
                //the url to the template for this view
                templateUrl: "views/student-profile.html",
                //the controller of this view
                controller: "StudentProfileController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        }
                        return currentUser
                    }
                }
            })
            .when("/logout", {
                controller: "LogoutController",
                template: " "
            })
            //otherwise, default to sending them to the index page
            .otherwise({
                redirectTo: "/login"
            });


        //NOT WORKING 042016 0251am $locationProvider.html5Mode({ enabled: true, requireBase: false });
        //# Use html5 mode.
        $locationProvider.html5Mode({
            enabled: true
        });
        //This #! in your URL is very important, as it is what will alert crawlers 
        //that your app has AJAX content and that it should do it’s AJAX crawling magic.
        $locationProvider.hashPrefix('!');
     }])