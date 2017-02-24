angularApp
    //a controller to display the data to appropriately list views 
    // allows us to add data to the scope and access it from our views.
    .controller("ListsController", function($scope, $timeout, $window, $location, scTypedArrayOfList, referencesManager, pagingParams, listsDataStore,  Lists) {
        angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500)

        $scope.referencesManager = referencesManager
        $scope.lists = []
        $scope.totalLists = 0
        if(scTypedArrayOfList) {
            debugger
            referencesManager.extractUserReferences(scTypedArrayOfList)
            $scope.totalLists = scTypedArrayOfList.setSize
            const paging = scTypedArrayOfList.paging
            if(paging) $scope.totalLists += paging.remainder
            pagingParams.update(paging)
            addUniqueLists(scTypedArrayOfList.values)
        }

        $scope.getListRefById = function(listId) {
            return referencesManager.getLists().getById(listId)
        }
        
        $scope.getUserRefById = function(listId) {
            return referencesManager.getUsers().getById(listId)
        }

        $scope.loadMoreLists = function() {
            if($scope.loadingMoreLists) return
            $scope.loadingMoreLists = true
            if (!pagingParams.canLoadMore()) return
            Lists.loadMoreLists(pagingParams)
                .then((scTypedArrayOfList) => {
                    referencesManager.extractUserReferences(scTypedArrayOfList)
                    addUniqueLists(scTypedArrayOfList.values)
                    pagingParams.update(scTypedArrayOfList.paging)
                    $scope.loadingMoreLists = false
                    NProgress.done();
                    debugger
                }, (err) => {
                    debugger
                    NProgress.done();
                    $scope.loadingMoreLists = false
                })
        }

        $scope.userSearched = false;

        var currentUser = User.getCurrent();
        User.showNecessaryIndexViews();

        $scope.showSearchInput = function() {
            $(".pubs-search-input").css("width", "100%");
            $(".pubs-search-input").focus();
            $scope.searchResults = 0;
            $scope.searchIsOpen = true;

            $scope.markAllPubsMatchSearch(true);
        }

        $scope.hideSearchInput = function() {
            $(".pubs-search-input").css("width", "0%");
            $scope.searchResults = 0;
            $scope.searchIsOpen = false;
        }

        $('.pubs-search-input').isEmptyInput(function() {
            $scope.searchResults = 0;
            $scope.markAllPubsMatchSearch(true);
            $scope.$apply();
        });

        $('.pubs-search-input').keyup(function() {
            var search = $(".pubs-search-input").val();
            if(search && search.trim().length > 0) {
                $scope.searchUserLists(search);
                $scope.$apply();
            }
        });

        function getScope() {
            return $scope
        }

        function addUniqueList (list) {
            $timeout(() => {
                listsDataStore.addUniqueObject(list, (newArray) => {
                    $scope.lists = newArray
                })
            })
        }

        function addUniqueLists (lists) {
            $timeout(() => {
                listsDataStore.addUniqueObjects(lists, (newArray) => {
                    $scope.lists = newArray
                })
            })
        }

        $timeout(() => {
            $("#cta-create-first-public-list").css("display", "block")  
        })
        

        $scope.$parent.seo = APP_ORIGINAL_SEO_MAP
    })