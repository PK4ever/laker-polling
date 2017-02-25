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
        prefix = prefix + "_"
        this.set = function(name, value, exdays) {
            setCookie(nameWithPrefix(name), value, exdays)
        }

        this.get = function(name) {
            return getCookie(nameWithPrefix(name))
        }

        this.remove = function(name) {
            removeCookie(nameWithPrefix(name))
        }
        
        this.removeAll = function() {
            removeAllByPrefix(prefix)
        }

        function nameWithPrefix(name) {
            return prefix + name
        }
    }
    
    function setCookie(name, value, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }

    function getCookie(name) {
        return getAllCookies()[name];
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

    function removeCookie(name) {
        setCookie(name, "", -1)
    }

    function removeAll() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            removeCookie(cookies[i].split("=")[0]);
        }
    }

    function removeAllByPrefix(prefix) {
        var cookies = document.cookie.split(";");
        debugger
        for (var i = 0; i < cookies.length; i++) {
            const name = cookies[i].split("=")[0]
            if(!stringStartsWith(name, prefix)) continue
            removeCookie(name);
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