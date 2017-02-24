'use strict';

angularApp
    .controller("ListPageController", function($scope, $window, $location, $routeParams, $timeout, list, Users, Lists, SocketIO, currentUser, referencesManager, pagingParams, itemsDataStore, Google){
        var listSlug = $routeParams.listSlug
        $scope.pagingParams = pagingParams
        $scope.newItemFormIsOpen = false
        $scope.listItems = []
        $scope.currentUser = currentUser;
        $scope.listSlug = listSlug

        $scope.isNewList = listSlug == 'new'
        $scope.listUpdateData = {}
        $scope.list = list
        $scope.loadingMoreItems = false

        $scope.selectedTab = 'items'
        
        if(list) {
            $scope.currentUserIsOwner = currentUser && currentUser.getId() == list.userId
            $scope.currentUserContributesToList =  $scope.currentUserIsOwner || list.viewerIsContributor
            referencesManager.addUser(list.references && list.references.user)
        } 
        $scope.listNotFound = !$scope.isNewList && (!list || !list.id || list._id)
        
        $scope.userSearchResults = [];

        $scope.newListData = {
            title: "",
            description: "",
            imageUrl: ""
        }

        $scope.newListItemType = 'link'
        $scope.itemTypes = [
            'link', 'image', 'text'
        ]
        if($scope.currentUserIsOwner) {
            $scope.itemTypes.push('list')
        }
        $scope.newListItemData = {
            link: {
                type: 'link',
                url: "",
                title: "",
                imageUrl: "",
                description: ""
            },
            image: {
                type: 'image',
                url: "",
                imageUrl: "",
                description: ""
            },
            text: {
                type: 'text',
                title: "",
                description: ""
            },
            list: {
                type: 'list',
                title: "",
                description: ""
            }
        }

        $scope.selectTab = function(tab) {
            $timeout(() => {
                $scope.selectedTab = tab
            })
        }

        $scope.updateNewItemType = function() {
            var e = document.getElementById("new-item-type-select");
            $scope.newListItemType = e.options[e.selectedIndex].text.toLowerCase()
        }

        $scope.updatePrivacy = function(privacy) {
            if(privacy == 'public') $("#show-make-list-public-modal").click();
            if(privacy == 'unlisted') $("#show-make-list-unlisted-modal").click();
            if(privacy == 'private') $("#show-make-list-private-modal").click();
        }

        $scope.confirmMakeListPublic = function() {
            updateListPrivacy('public')
        }
        $scope.confirmMakeListUnlisted = function() {
            updateListPrivacy('unlisted')
        }
        $scope.confirmMakeListPrivate = function() {
            updateListPrivacy('private')
        }

        function updateListPrivacy(privacy) {
            Lists.updatePrivacy($scope.list.id, privacy)
                .then((result) => {
                    if (result && result.value) {
                        $scope.list.privacy = privacy
                    }
                }, () => {
                    debugger
                })
        }

        $scope.updateListInfo = function() {
            $scope.saveListEditError = ""
            const updateData = {
                title: $scope.listUpdateData.title,
                description: $scope.listUpdateData.description,
                imageUrl: $scope.listUpdateData.imageUrl
            }
            if(!updateData.title || updateData.title.trim().length < 4) {
                $scope.saveListEditError = "Title must be at least 4 characters long."
                return
            }
            $scope.savingListEdits = true
            Lists.updateById($scope.list.id, updateData)
                .then((success) => {
                    if (success) {
                        $scope.list.title = updateData.title
                        $scope.list.description = updateData.description
                        $scope.list.imageUrl = updateData.imageUrl
                        $scope.listUpdateData = {}
                    }
                    $scope.savingListEdits = false
                    $scope.editFormIsOpen = false
                }, (err) => {
                    $scope.savingListEdits = false
                })
        }

        $scope.updateListItemInfo = function(item) {
            const type = item;
            const updateData = {
                title: item.data.title,
                description: item.data.description,
                url: item.data.url,
                imageUrl: item.data.imageUrl
            }

            item.virtuals.lastUpdateAttemptData = updateData
            item.virtuals.savingUpdates = true
            item.virtuals.updateData = updateData
            Lists.updateItemById($scope.list.id, item._id || item.id, updateData)
                .then((_item) => {
                    item.data.url = _item.data.url
                    item.data.imageUrl = _item.data.imageUrl
                    item.data.title = _item.data.title
                    item.data.description = _item.data.description

                    item.virtuals.lastUpdateAttemptData = {}
                    item.virtuals.saveUpdatesFailed = false
                    item.virtuals.savingUpdates = false
                    item.virtuals.saveUpdatesError = ""
                    item.virtuals.editFormIsOpen = false
                }, (err) => {
                    item.virtuals.saveUpdatesError = "Failed to save updates."
                    item.virtuals.saveUpdatesFailed = true
                    item.virtuals.savingUpdates = false
                })
        }

        $scope.moveListItemToTop = function(listItem) {
            Lists.updateItemById($scope.list.id, listItem.id, { moveToTop: true })
                .then((item) => {
                    listItem.reorderedAt = item.reorderedAt
                }, (err) => {
                    debugger
                })
        }

        $scope.openEditListInfoForm = function() {
            $scope.listUpdateData.title = $scope.listUpdateData.title || $scope.list.title
            $scope.listUpdateData.description = $scope.listUpdateData.description || $scope.list.description
            $scope.listUpdateData.imageUrl = $scope.listUpdateData.imageUrl || $scope.list.imageUrl
            $scope.editFormIsOpen = true
        }

        $scope.closeEditListInfoForm = function() {
            $scope.editFormIsOpen = false
            $scope.saveListEditError = ""
        }

        $scope.openEditItemForm = function(item) {
            if(!item) return
            if(!item.virtuals) item.virtuals = {}
            item.virtuals.updateData = {
                url: item.data.url,
                imageUrl: item.data.imageUrl,
                title: item.data.title,
                description: item.data.description
            }
            item.virtuals.editFormIsOpen = true
        }

        $scope.closeEditItemForm = function(item) {
            if(!item) return
            if(!item.virtuals) item.virtuals = {}
            $timeout(() => {
                item.virtuals.editFormIsOpen = false
                item.virtuals.saveUpdatesError = ""
                if(!item.virtuals.updateData) return
                item.data.title = item.virtuals.updateData.title
                item.data.description = item.virtuals.updateData.description
                item.data.url = item.virtuals.updateData.url
                item.data.imageUrl = item.virtuals.updateData.imageUrl
            })
        }

        $scope.openNewItemForm = function() {
            $scope.newItemFormIsOpen = true
            $scope.newContributorFormIsOpen = false
        }

        $scope.closeNewItemForm = function() {
            $scope.newItemFormIsOpen = false
            $('html, body').animate({
                scrollTop: $("#container-contributor-controls").offset().top - 1000
            }, 1);
        }

        $scope.closeContributorControlsMenu = function() {
            $timeout(() => {
                $("#button-close-contributor-controls-menu").click()
            })
        }

        $scope.closeNewListPrivacyMenu = function() {
            $timeout(() => {
                $("#button-close-new-list-privacy-menu").click()
            })
        }

        $scope.openAddContributorForm = function() {
            $scope.newContributorFormIsOpen = true
            $scope.newItemFormIsOpen = false
        }

        $scope.loadMoreItems = function() {
            if($scope.currentUserIsUnauthorized) return
            if(!$scope.list) return
            if($scope.loadingMoreItems) return
            $scope.loadingMoreItems = true
            if (!pagingParams.canLoadMore()) return
            Lists.loadMoreItems($scope.list.id, pagingParams)
                .then((response) => {
                    try {
                        if(response.status == 401) {
                            $scope.currentUserIsUnauthorized = true
                            return
                        }
                        if (response.listItems) {
                            debugger
                            referencesManager.extractUserReferences(response.listItems)
                            addUniqueItems(response.listItems.values)
                            pagingParams.update(response.listItems.paging)
                        }
                        if (response.descendantLists) {
                            referencesManager.extractUserReferences(response.descendantLists)
                            addUniqueItems(response.descendantLists.values)
                        }

                        gatherItemVotes()
                        $scope.loadingMoreItems = false
                    } catch(err) {
                        debugger
                    }
                    NProgress.done();
                }, (err) => {
                    debugger
                    NProgress.done();
                    $scope.loadingMoreItems = false
                })
        }

        function gatherItemVotes() {
            $timeout(() => {
                $scope.listItems.map((item) => {
                    const ratingsData = {}
                    const ratings = item.ratings
                    if(!ratings) return
                    const countsMap = {r1s: 0, r5s: 0}
                    ratings.map((rating) => {
                        countsMap['r' + rating.value + 's'] += 1
                        if(currentUser && rating.actorUserId == currentUser.getId()) {
                            ratingsData.currentUserRated = rating.value
                        }
                    })
                    ratingsData.countsMap = countsMap
                        item.ratingsData = ratingsData
                })
            })
        }

        $scope.$on('socket:list_newItem', function(event, payload) {
            debugger
            const listItem = payload.data && payload.data.scListItem
            if(listItem) addUniqueItems([listItem])
        });

        $scope.getUserRefById = function(userId) {
            return referencesManager.getUsers().getById(userId)
        }

        $scope.getListShareOnTwitterText = function(list) {
            const tweetUrl = "mylysts.com/list/" + list.urlSlug
            const roomForText = 140 - tweetUrl.length - 1
            var text = list.title + ": " + list.description
            text = text.substring(0, roomForText)
            return encodeURIComponent(text + " " + tweetUrl)
        }

        const VALID_ITEM_RATINGS = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }
        $scope.rateItem = function(item, rating) {
            if(!VALID_ITEM_RATINGS[rating]) return
            
            item.ratingsData = item.ratingsData || {}
            item.ratingsData.countsMap = item.ratingsData.countsMap || {r1s: 0, r3s: 0, r5s: 0}
            const currentUserExistingRating = item.ratingsData.currentUserRated

            if(currentUserExistingRating == rating) return
            dispatchEvent("recordListItemRating", {
                itemId: item.id || item._id,
                rating: rating
            })

            item.ratingsData.currentUserRated = rating

            if(rating == 1) {
                item.ratingsData.countsMap['r1s'] += 1
                if(currentUserExistingRating == 3) item.ratingsData.countsMap['r3s'] -= 1
                if(currentUserExistingRating == 5) item.ratingsData.countsMap['r5s'] -= 1
            } else if(rating == 3) {
                item.ratingsData.countsMap['r3s'] += 1
                if(currentUserExistingRating == 1) item.ratingsData.countsMap['r1s'] -= 1
                if(currentUserExistingRating == 5) item.ratingsData.countsMap['r5s'] -= 1
            } else if(rating == 5) {
                item.ratingsData.countsMap['r5s'] += 1
                if(currentUserExistingRating == 1) item.ratingsData.countsMap['r1s'] -= 1
                if(currentUserExistingRating == 3) item.ratingsData.countsMap['r3s'] -= 1
            }
        }

        $scope.getItemURL = function(item) {
            if(!item) return ""
            var itemUrl = item.data && item.data.url
            if(!itemUrl) itemUrl = item.url
            if(!itemUrl) return ""

            if(!itemUrl.contains("http://") && !itemUrl.contains("https://")) {
                itemUrl = "http://" + itemUrl.trim()
            }
            return itemUrl
        }

        $scope.getItemImageURL = function(item) {
            if(!item) return ""
            var itemImageUrl = item.data && item.data.imageUrl
            if(!itemImageUrl) itemImageUrl = item.imageUrl
            if(!itemImageUrl) return ""

            if(!itemImageUrl.contains("http://") && !itemImageUrl.contains("https://")) {
                itemImageUrl = "http://" + itemImageUrl.trim()
            }
            return itemImageUrl
        }

        $scope.getItemUrlSlug = function(item) {
            if(!item) return ""
            var urlSlug = item.urlSlug
            if (urlSlug) return urlSlug
            if(!item.data) return ""
            return item.data.urlSlug
        }

        $scope.getItemTitle = function(item) {
            if(!item) return ""
            var title = item.title
            if (title) return title
            if(!item.data) return ""
            return item.data.title
        }

        $scope.deleteList = function() {
            $("#show-delete-list-modal").click();
        }

        $scope.confirmDeleteList = function() {
            Lists.deleteById($scope.list.id)
            .then(function(list) {
                debugger
                $window.location.href = "/lists"
            }, function(err) {
                debugger
                $scope.errorStartingList = true
            })
        }

        $scope.deleteListItem = function(item) {
            $scope.itemToDelete = item
            $("#show-delete-list-item-modal").click();
        }

        $scope.confirmDeleteListItem = function() {
            const itemId = $scope.itemToDelete.id || $scope.itemToDelete._id
            delete $scope.itemToDelete
            Lists.deleteItemById($scope.list.id || $scope.list._id, itemId)
            .then(function(success) {
                debugger
                itemsDataStore.deleteObjectById(itemId, (newArray) => {
                    $scope.listItems = newArray
                })
            }, function(err) {
                debugger
                $scope.errorStartingList = true
            })
        }

        const VALID_LIST_PRIVACY_MAP = {
            public: "public",
            unlisted: "unlisted",
            private: "private"
        }

        $scope.updateNewListPrivacy = function(privacy) {
            if(!privacy) privacy = privacy.toLowerCase()
            if(VALID_LIST_PRIVACY_MAP[privacy]) $scope.newListData.privacy = privacy
            else $scope.newListData.privacy = "unlisted"
        }

        $scope.startNewList = function() {
            const title = $scope.newListData.title
            const description = $scope.newListData.description
            var privacy = $scope.newListData.privacy || "unlisted"
            privacy = privacy.toLowerCase()
            if (!VALID_LIST_PRIVACY_MAP[privacy]) privacy = "unlisted"

            const data = {
                title: title,
                description: description,
                imageUrl: $scope.newListData.imageUrl,
                privacy: privacy
            }

            //start error handling
            if(!title || title.trim().length < 4) {
                $scope.errorStartingList = true
                $scope.startNewListErrorMessage = "Title must be at least four characters long."
                return
            }
            if(!description || !description.trim().length) {
                $scope.errorStartingList = true
                $scope.startNewListErrorMessage = "Description required."
                return
            }
            //end error handling
            
            Lists.startNewList(data).then(function(list) {
                debugger
                $scope.errorStartingList = false
                $window.location.href = "/list/" + list.urlSlug
            }, function(err) {
                debugger
                $scope.errorStartingList = true
                $scope.startNewListErrorMessage = "We could not create your list at this time. Please try again later."
            })
        }

        $scope.addNewItem = function() {
            const newItemType = $scope.newListItemType
            const newItemDataSource = $scope.newListItemData[newItemType]
            const newItem = {
                type: newItemDataSource.type,
                title: newItemDataSource.title,
                description: newItemDataSource.description,
                url: newItemDataSource.url,
                imageUrl: newItemDataSource.imageUrl
            }
            debugger
            var re = /((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            
            if(newItem.url) {
                newItem.url = newItem.url.replace(' ', '')
                const url = newItem.url.trim()
                const validUrl = re.test(url) && url.split(".").length > 1
                if(!validUrl) {
                    $scope.addNewItemDataValidationError = "Please enter a valid url. Example: cool-website.com"
                    return 
                }
            }
            if(newItem.imageUrl) {
                newItem.imageUrl = newItem.imageUrl.replace(' ', '')
                const imageUrl = newItem.imageUrl.trim()
                const validImageUrl = re.test(imageUrl) && imageUrl.split(".").length > 1
                if(!validImageUrl) {
                    $scope.addNewItemDataValidationError = "Please enter a valid image url. Example: cool-website.com"
                    return 
                }
            }
            $scope.addNewItemDataValidationError = ""

            $scope.newListItemData[newItemType].title = ""
            $scope.newListItemData[newItemType].description = ""
            $scope.newListItemData[newItemType].url = ""
            $scope.newListItemData[newItemType].imageUrl = ""

            delete $scope.addNewListItemSuccess
            delete $scope.addNewListItemError
            $scope.addingNewListItem = true
            Lists.addNewItem($scope.list.id, newItem)
                .then(function(item) {
                    debugger
                    if(!item || !(item.id || item._id)) return
                    referencesManager.addUserReference(item)
                    addUniqueItem(item)
                    $scope.addNewListItemSuccess = true
                    delete $scope.addingNewListItem
                }, function(err) {
                    debugger
                    NProgress.done()
                    $scope.addNewListItemError = true
                    $scope.newListItemData[newItemType] = newItem
                    delete $scope.addingNewListItem
                })
        }

        $scope.loginGoogler = function() {
            loginGoogler({ scope: $scope, window: $window, location: $location, Google: Google }, {
                preLogin_action_type: "request-to-contribute",
                preLogin_action_object_id: listSlug
            })
        }

        function getScope() {
            return $scope
        }

        function runPreLoginAction() {
            var urlParams = $window.location.search;
            var smSrc = urlParams.split("sm-src=")[1];
            
            if(smSrc == "login") {
                var preLoginActionType = getCookie("preLogin_action_type")
                var preLoginActionObjectId = getCookie("preLogin_action_object_id")
                setCookie("preLogin_action_type", null)
                setCookie("preLogin_action_object_id", null)
                if(preLoginActionType = "request-to-contribute" && preLoginActionObjectId == listSlug) {
                    $scope.requestToContribute(publication)
                }
                $window.location.href = "/p/" + listSlug
            }
        }

        if(list && (list.id || list._id)) {
            dispatchEvent("recordPageView", {
                pageType: "list",
                listId: list.id || list._id
            })
        }

        $scope.recordListItemClick = function(item) {
            if (!item) return
            dispatchEvent("recordListItemClick", {
                itemId: item.id || item._id
            })
        }

        function addUniqueItem (item) {
            $timeout(() => {
                itemsDataStore.addUniqueObject(item, (newArray) => {
                    $scope.listItems = newArray
                })
            })
        }

        function addUniqueItems (items) {
            $timeout(() => {
                itemsDataStore.addUniqueObjects(items, (newArray) => {
                    $scope.listItems = newArray
                })
            })
        }

        $('#input-search-users-for-contributors').isEmptyInput(function() {
            $scope.userSearchResults = [];
            $scope.$apply();
        });

        var searchUsersTimeout
        $('#input-search-users-for-contributors').keyup(function() {
            var keywords = $("#input-search-users-for-contributors").val();
            if(keywords && keywords.trim().length > 0) {
                clearTimeout(searchUsersTimeout)
                searchUsersTimeout = setTimeout(() => {
                    $scope.searchUsers(keywords);
                }, 500)
            }
        });

        $scope.searchUsers = function(keywords) {
            $scope.usersSearchKeywords = keywords
            $scope.searchingUsers = true
            Users.searchByKeywords(keywords)
                .then((scTypedArray) => {
                    $scope.userSearchResults = scTypedArray.values;
                    $scope.searchingUsers = false
                }, (err) => {
                    debugger
                    $scope.searchUsers = false
                })
        }

        $scope.addUserAsContributor = function(user) {
            $scope.userToAddAsContributor = user
            $("#show-add-new-contributor-modal").click();
        }

        $scope.confirmAddUserAsContributor = function() {
            confirmAddUserAsContributor($scope.userToAddAsContributor)
        }

        function confirmAddUserAsContributor(user) {
            Lists.addUserAsContributor($scope.list.id, user.id || user._id)
                .then((listContributor) => {
                    if (listContributor) {
                        $timeout(() => {
                            $scope.list.contributors.push(listContributor.user)
                            user.addedAsContributor = true
                            delete user.failedToAddAsContributor  
                        })
                    } else {
                        $timeout(() => {
                            user.failedToAddAsContributor = true
                        })
                    }
                    
                }, (err) => {
                    user.failedToAddAsContributor = true
                })
        }

        $scope.addUserAsWatcher = function(user) {
            Lists.addUserAsWatcher($scope.list.id, user.id || user._id)
                .then((success) => {
                    if (success) {
                        $timeout(() => {
                            $scope.list.currentUserIsWatcher = true
                            $scope.list.numWatchers += 1
                            delete user.failedToAddAsWatcher
                        })
                    } else {
                        user.failedToAddAsWatcher = true
                    }
                }, (err) => {
                    user.failedToAddAsWatcher = true
                    debugger
                })
        }

        $scope.removeUserAsContributor = function(user) {
            Lists.removeUserAsContributor($scope.list.id, user.id || user._id)
                .then((success) => {
                    if (success) {
                        $scope.list.contributors.push(user)
                    }
                    user.addedAsContributor = true
                    delete user.failedToAddAsContributor
                }, (err) => {
                    user.failedToAddAsContributor = true
                })
        }

        $scope.userIsAlreadyContributor = function(user) {
            if(!user) return false
            const userId = user.id || user._id
            const contributors = $scope.list.contributors
            const numContributors = contributors.length
            for(var i = 0; i < numContributors; i++) {
                if(contributors[i].userId == userId) return true
            }
            return false
        }

        updateSEOMap(list && "List — " + list.title || 'New List', list && list.description || "")

        SocketIO.forward('newListItem');
        $scope.$on('socket:newListItem', function(event, data) {
            debugger
            //console.log("Got " + event.name + " Message: " + JSON.stringify(data.payload))
            var payload = data.payload;
            if (payload) {
                $scope.numActiveClients = payload + " Active Clients";
            }
        });
    })