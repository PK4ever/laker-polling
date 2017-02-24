package edu.oswego.cs.lakerpolling.controllers

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

//        "/"(controller: 'application', action:'index')
        "/api/user/auth"(controller: 'application', action: 'auth')
//        "/application"(view: '/notFound')
//        "/application/**"(view: '/notFound')
//        "500"(view: '/error')
//        "404"(view: '/notFound')
        "/**"(controller: 'application', action: 'index')
    }
}
