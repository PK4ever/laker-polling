angularApp
    .controller("NotificationsListsController", function($scope, $window, notifications, Notifications) {
        if(notifications) $scope.notifications = notifications.data.notes;
        else $scope.notifications = [];

        var currentUser = User.getCurrent();
        User.showNecessaryIndexViews();

        $scope.hideNote = function(note) {
            note.hiding = true;

            Notifications.hideNote(note).then(function(response){
                if(response) {
                    if(response.status == 200 || response.status == 204) {
                        note.hidden = true;
                    } else {
                        note.actionStatus = "Failed to hide note.";
                        console.log("Failed to hide note: " + JSON.stringify(response));
                    }
                }
                note.hiding = false;
            }, function(response){
                console.log("Error occurred trying to hide note: " + JSON.stringify(response));
                note.hiding = false;
            });
        }

        $scope.hoverIn = function(){
            this.hoverEdit = true;
        };
        $scope.hoverOut = function(){
            this.hoverEdit = false;
        };
    })