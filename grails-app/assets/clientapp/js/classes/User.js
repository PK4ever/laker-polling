/**
 * Created by lwdthe1 on 2/14/2017.
 */

var User = (function() {
    var currentUserCookieJar
    function User(accessToken, dbUser) {
        this.accessToken = accessToken
        this.id = dbUser.id
        this.name = dbUser.name
        this.email = dbUser.email
        this.imageUrl = dbUser.imageUrl
        this.type = dbUser.type
    }

    const COOKIE_KEYS = {
        ID: "id",
        ACCESS_TOKEN: "accessToken",
        EMAIL: "email",
        NAME: "name",
        IMAGE_URL: "imageUrl",
        TYPE: "type",
        _PREFIX: {
            CURRENT_USER: "currentUser"
        }
    }

    function getCurrentUserCookieJar() {
        if(!currentUserCookieJar) {
            currentUserCookieJar = Cookies.createNewJar(COOKIE_KEYS._PREFIX.CURRENT_USER)
        }
        return currentUserCookieJar
    }

    User.prototype.getId = function() {
        return this.id;
    };

    User.prototype.getName = function() {
        return this.name;
    }

    User.prototype.getEmail = function() {
        return this.email;
    }

    User.prototype.getType = function() {
        return this.type;
    }

    User.prototype.isStudent = function() {
        return this.getType() == 'student'
    }

    User.prototype.isTeacher = function() {
        return this.getType() == 'teacher'
    }

    User.prototype.isAdmin = function() {
        return this.getType() == 'admin'
    }
    
    User.prototype.getImageUrl = function() {
        return this.imageUrl;
    }

    User.prototype.getAccessToken = function() {
        return this.accessToken;
    }

    User.prototype.getRefreshToken = function() {
        return this.refreshToken;
    }

    User.prototype.getPubs = function() {
        return this.pubs;
    }

    User.prototype.setEmail = function(email) {
        this.email = email;
        setCookie(COOKIE_KEYS.EMAIL, email, 50);
    }

    /**
     * @return true if saved and false if not.
     */
    User.prototype.saveAsCurrent = function () {
        const accessToken = this.getAccessToken()
        const id = this.getId()
        if (!accessToken || !id) return false
        const cookieJar = getCurrentUserCookieJar()
        cookieJar.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, 50);
        cookieJar.set(COOKIE_KEYS.ID, id, 50);
        cookieJar.set(COOKIE_KEYS.NAME, this.getName(), 50);
        cookieJar.set(COOKIE_KEYS.EMAIL, this.getEmail(), 50);
        cookieJar.set(COOKIE_KEYS.IMAGE_URL, this.getImageUrl(), 50);
        cookieJar.set(COOKIE_KEYS.TYPE, this.getType(), 50);
        return true
    }

    User.getCurrent = function() {
        const cookieJar = getCurrentUserCookieJar()
        const accessToken = cookieJar.get(COOKIE_KEYS.ACCESS_TOKEN)
        const id = cookieJar.get(COOKIE_KEYS.ID)
        if(!accessToken || !id) return
        
        const data = {
            id: id,
            email: cookieJar.get(COOKIE_KEYS.EMAIL),
            name: cookieJar.get(COOKIE_KEYS.NAME),
            imageUrl: cookieJar.get(COOKIE_KEYS.IMAGE_URL),
            type: cookieJar.get(COOKIE_KEYS.TYPE)
        }
        return new User(accessToken, data)
    }

    User.logoutCurrent = function (callback) {
        getCurrentUserCookieJar().removeAll();
        callback && callback()
    }
    return User
}())

String.prototype.contains = function(it) { return this.indexOf(it) > -1}