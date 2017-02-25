/**
 * Created by lwdthe1 on 2/14/2017.
 */
var Cookies = (function() {
    var cachedCookies

    function createNewJar(prefix){
        if(!prefix) return
        return Object.freeze(new Jar(prefix))
    }

    function Jar(prefix) {
        this.set = function(key, value, exdays) {
            setCookie(keyWithPrefix(key), value, exdays)
        }

        this.get = function(key) {
            return getCookie(keyWithPrefix(key))
        }

        this.remove = function(key) {
            removeCookie(keyWithPrefix(key))
        }
        
        this.removeAll = function() {
            removeAllByPrefix(prefix)
        }

        function keyWithPrefix(key) {
            return prefix + "_" + key
        }
    }
    
    function setCookie(key, value, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = key + "=" + value + "; " + expires;
    }

    function getCookie(key) {
        return getAllCookies()[key];
    }

    function getAllCookies(c,C,i) {
        if(cachedCookies) return cachedCookies
        var cookies = {};
        c = document.cookie.split('; ');

        for(i=c.length-1; i>=0; i--){
           C = c[i].split('=');
           cookies[C[0]] = C[1];
        }

        cachedCookies = cookies
        return cachedCookies
    }

    function removeCookie(key) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

    function removeAll() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            removeCookie(cookies[i].split("=")[0]);
        }
    }

    function removeAllByPrefix(prefix) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            if(!stringStartsWith(cookies[i].split("=")[0], prefix)) continue
            removeCookie(key);
        }
    }
    
    return {
        set: setCookie,
        get: getCookie,
        getAll: getAllCookies,
        remove: removeCookie,
        createNewJar: createNewJar
    }
}())