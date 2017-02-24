angularApp
    //a controller to display the data to appropriately list views 
    // allows us to add data to the scope and access it from our views.
    .controller("SearchController", function($scope, $timeout, $window, $location, currentUser, referencesManager, pagingParams,  Lists, Users) {
        angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500)
        
        $scope.currentUser = currentUser
        $scope.referencesManager = referencesManager

        $scope.searchKeywords = ""
        $scope.userSearchResults = [];
        $scope.listSearchResults = [];
        $scope.searchType = 'lists'
        $scope.searchTypes = [
            'lists', 'users'
        ]

        $scope.updateSearchType = function() {
            var e = document.getElementById("new-item-type-select");
            $scope.searchType = e.options[e.selectedIndex].text.toLowerCase()
            $scope.search($scope.searchKeywords);
        }

        $scope.getListRefById = function(listId) {
            return referencesManager.getLists().getById(listId)
        }
        
        $scope.getUserRefById = function(listId) {
            return referencesManager.getUsers().getById(listId)
        }

        $scope.loadMoreSearchLists = function() {
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

        $('#input-search').isEmptyInput(function() {
            $scope.userSearchResults = [];
            $scope.$apply();
        });

        var searchTimeout
        $('#input-search').keyup(function() {
            var keywords = $scope.searchKeywords
            if(keywords && keywords.trim().length > 0) {
                clearTimeout(searchTimeout)
                searchTimeout = setTimeout(() => {
                    $scope.search(keywords);
                }, 500)
            }
        });

        $scope.search = function(keywords) {
            if(keywords && keywords.trim().length > 0) {
                if($scope.searchType == 'lists') {
                    $scope.searchLists(keywords)
                } else {
                    $scope.searchUsers(keywords)
                }
            }
        }

        $scope.searchUsers = function(keywords) {
            $scope.usersSearchKeywords = keywords
            $scope.searchingUsers = true
            Users.searchByKeywords(keywords)
                .then((scTypedArrayOfUsers) => {
                    $scope.userSearchResults = scTypedArrayOfUsers.values;
                    //pagingParams.update(scTypedArrayOfList.paging)
                    $scope.searchingUsers = false
                }, (err) => {
                    debugger
                    $scope.searchUsers = false
                })
        }

        $scope.searchLists = function(keywords) {
            $scope.usersSearchKeywords = keywords
            $scope.searchingUsers = true
            Lists.searchByKeywords(keywords)
                .then((scTypedArrayOfList) => {
                    $scope.listSearchResults = scTypedArrayOfList.values;
                    referencesManager.extractUserReferences(scTypedArrayOfList)
                    //pagingParams.update(scTypedArrayOfList.paging)
                    $scope.searchingLists = false
                }, (err) => {
                    debugger
                    $scope.searchingLists = false
                })
        }

        User.showNecessaryIndexViews();

        $scope.$parent.seo = {
            title: "Search",
            description: "Discover lists and users. Learn something new."
        }
    })