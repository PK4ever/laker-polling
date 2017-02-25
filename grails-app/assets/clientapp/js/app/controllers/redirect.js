angularApp
    //a controller to display the data to appropriately list views 
    // allows us to add data to the scope and access it from our views.
    .controller("DashboardRedirectController", function($scope, $window, $location, $routeParams, $timeout, currentUser) {
        debugger
        if(!currentUser) {
            $window.location.href = '/logout'
        } else if(currentUser.type == 'student') {
            $location.path('/student')
        } else if (currentUser.type == 'teacher') {
            $location.path('/teacher')
        } else {
            $window.location.href = '/logout'
        }
    })