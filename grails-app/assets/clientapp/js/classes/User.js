/**
 * Created by lwdthe1 on 3/26/2016.
 */
//dbUser._id, dbUser.googlePersonId, dbUser.email, dbUser.username, dbUser.imageUrl
function User(accessToken, id, googlePersonId, email, username, imageUrl) {
    this.accessToken = accessToken
    this.id = id;
    this.googlePersonId = googlePersonId;
    this.email = email;
    this.username = username;
    this.imageUrl = imageUrl;
    this.listIds = [];
}

const COOKIE_KEYS = {
    ID: "currentUser_id",
    ACCESS_TOKEN: "currentUser_accessToken",
    GOOGLE_PERSON_ID: "currentUser_googlePersonId",
    EMAIL: "currentUser_email",
    USERNAME: "currentUser_username",
    IMAGE_URL: "currentUser_imageUrl",
    LIST_IDS: "currentUser_listIds",
    _PREFIX: {
        CURRENT_USER: "currentUser_"
    }
}

User.prototype.setId = function(id) {
    this.id = id;
};

User.prototype.setPubs = function(pubs) {
    this.pubs = pubs;

    //try to store the pubs in local storage if local storage is available
    if(typeof(Storage) !== "undefined"){
        var pubsStringified = JSON.stringify(pubs);

        /*we store the pubs in the browser's local storage instead of cookies 
        because it may be too large for cookies*/
        localStorage.setItem(COOKIE_KEYS.LIST_IDS, pubsStringified);
    } else {
        // Sorry! No Web Storage support..
    }
};

User.prototype.addPub = function(pub) {
    this.pubs.push(pub);
};

User.prototype.getId = function() {
    return this.id;
};

User.prototype.getUsername = function() {
    return this.username;
};

User.prototype.getEmail = function() {
    return this.email;
};

User.prototype.getUrl = function() {
    return this.url;
};
User.prototype.getImageUrl = function() {
    return this.imageUrl;
};
User.prototype.getAccessToken = function() {
    return this.accessToken;
};
User.prototype.getRefreshToken = function() {
    return this.refreshToken;
};
User.prototype.getGooglePersonId = function() {
    return this.googlePersonId;
};

User.prototype.getPubs = function() {
    return this.pubs;
};

User.prototype.setEmail = function(email) {
    this.email = email;
    setCookie(COOKIE_KEYS.EMAIL, email, 50);
};

User.prototype.removeAllPubs = function() {
    this.pubs = [];
    localStorage.removeItem(COOKIE_KEYS.LIST_IDS);
}

User.getCurrent = function() {
    var currentUser = new User(
        getCookie(COOKIE_KEYS.ACCESS_TOKEN) || (USE_DEV_USER && "586d45c4fae21f11002eef69-2debd6da0aa00b347efccebd63ad1cd0"),
        getCookie(COOKIE_KEYS.ID) || (USE_DEV_USER && "586d45c4fae21f11002eef69"),
        getCookie(COOKIE_KEYS.GOOGLE_PERSON_ID) || (USE_DEV_USER && "586d45c4fae21f11002eef69"),
        getCookie(COOKIE_KEYS.EMAIL) || (USE_DEV_USER && "lwdthe1@gmail.com"),
        getCookie(COOKIE_KEYS.USERNAME)|| (USE_DEV_USER && "lwdthe1"),
        getCookie(COOKIE_KEYS.IMAGE_URL) || (USE_DEV_USER && "https://lh3.googleusercontent.com/-HlFEDmCqzQs/AAAAAAAAAAI/AAAAAAAAT3o/Qp_T96H3pDw/photo.jpg?sz=50")
    );
    if(!!currentUser.getAccessToken() && !!currentUser.getId()) {
        var userPubsFromCookies = localStorage.getItem(COOKIE_KEYS.LIST_IDS);
        //alert(userPubsFromCookies);
        if(userPubsFromCookies) currentUser.setPubs(JSON.parse(userPubsFromCookies));
        return currentUser;
    }
    else return null;
}

User.setCurrent = function (user) {
    if(!user) return false
    const accessToken = user.getAccessToken()
    if (!accessToken) return false
    /*set all the cookies for 50 days, 10 days less than expiration date of medium tokens
    this way we won't have to deal with using the refresh token to get a new access token.
    We'll just have the user login again before the tokens expire*/
    setCookie(COOKIE_KEYS.ACCESS_TOKEN, user.getAccessToken(), 50);
    setCookie(COOKIE_KEYS.ID, user.getId(), 50);
    setCookie(COOKIE_KEYS.GOOGLE_PERSON_ID, user.getGooglePersonId(), 50);
    setCookie(COOKIE_KEYS.EMAIL, user.getEmail(), 50);
    setCookie(COOKIE_KEYS.USERNAME, user.getUsername(), 50);
    setCookie(COOKIE_KEYS.IMAGE_URL, user.getImageUrl(), 50);
}

User.logout = function (callback) {
    var cookies = getCookies();

    for(var cookie in cookies) {
        if(cookie.contains(COOKIE_KEYS._PREFIX.CURRENT_USER)) {
            removeCookie(cookie);
        }
    }
    removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
    
    //try to remove the user's pubs from local storage
    if(typeof(Storage) !== "undefined"){
        localStorage.removeItem(COOKIE_KEYS.LIST_IDS);
    } else {
        //no local storage available in this browser
    }

    //make sure the accessToken is removed
    setTimeout(() => {
        removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
        callback()
    }, 500)
}

User.showNecessaryIndexViews = function() {
    var currentUser = User.getCurrent();
    /*
    if(currentUser) {
        var loginContainer = document.getElementById("login-promo-container");
        if(loginContainer) loginContainer.style.display = "none";

        var currentUsername = currentUser.getUsername();
      
        document.getElementById("nav-current-user-username").innerHTML = "@" + currentUsername;
        document.getElementById("nav-current-user-email").innerHTML = currentUser.getEmail();
        document.getElementById("nav-current-user-image").src = currentUser.getImageUrl();

        document.getElementById("nav-current-user-image").style.display = "block";
        document.getElementById("nav-link-user-only-lists-me").style.display = "block";
        //document.getElementById("nav-link-notifications").style.display = "block";
        document.getElementById("nav-link-user-only-new-list").style.display = "block";

        document.getElementById("nav-current-user-container").style.display = "block";
    } else {
        var loginContainer = document.getElementById("login-promo-container");
        if(loginContainer) loginContainer.style.display = "block";

        var navMobileToggle = document.getElementById("nav-mobile-toggle");
        if(navMobileToggle) navMobileToggle.style.display = "none";

        document.getElementById("nav-current-user-container").style.display = "none";
        document.getElementById("nav-current-user-dropdown").style.display = "none";
        document.getElementById("nav-current-user-image").style.display = "none";
        document.getElementById("nav-link-user-only-lists-me").style.display = "none";
        document.getElementById("nav-link-user-only-new-list").style.display = "none";
    }*/
}

String.prototype.contains = function(it) { return this.indexOf(it) > -1}