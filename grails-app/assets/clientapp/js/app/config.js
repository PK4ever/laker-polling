angularApp
    .config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {

        var auth2; // this variable needs to be persistent across pages or the code below it needs to run on all pages
        //otherwise no action on google auth can be taken.

        gapi.load('auth2', function () {
           auth2 = gapi.auth2.init({
               client_id: '896100416043-v0cvdf52tteag7ha8939fog24sr7bm2g.apps.googleusercontent.com',
               scope: 'profile email'
           });
           window.auth2 = auth2;
        });

        //the routeProvider module helps us configure routes in AngularJS.
        $routeProvider
            .when("/login/", {
                //the url to the template for this view
                templateUrl: "/assets/views/login.html",
                //the controller of this view
                controller: "LoginController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function($location) {
                        var currentUser = User.getCurrent();
                        if(currentUser){
                            $location.path('/dashboard')
                            return
                        }
                        return
                    }
                }
            })
            .when("/student", {
                //the url to the template for this view
                templateUrl: "/assets/views/dashboard/student.html",
                //the controller of this view
                controller: "StudentDashboardController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function($location) {
                        debugger
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        } else if(currentUser.isTeacher()) {
                            $location.path('/teacher')
                            return
                        }
                        return currentUser
                    }
                }
            })
            .when("/teacher", {
                //the url to the template for this view
                templateUrl: "/assets/views/dashboard/teacher.html",
                //the controller of this view
                controller: "TeacherDashboardController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function($location) {
                        debugger
                        const currentUser = User.getCurrent();
                        if(!currentUser) {
                            redirectTo: '/logout'
                            return
                        } else if(currentUser.isStudent()) {
                            $location.path('/student')
                            return
                        }
                        return currentUser
                    }
                }
            })
            //when the user navigates to the root, index of our app
            .when("/dashboard/", {
                //the url to the template for this view
                template: " ",
                //the controller of this view
                controller: "DashboardRedirectController",
                //methods to retrieve content and do other things on load
                resolve: {
                    currentUser: function() {
                        return User.getCurrent();
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