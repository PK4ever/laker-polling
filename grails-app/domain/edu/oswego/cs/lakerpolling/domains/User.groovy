package edu.oswego.cs.lakerpolling.domains

/**
 * User model.
 */
class User {

    String firstName
    String lastName
    String email
    String imageUrl

    static hasOne = [authToken: AuthToken]

    static mapping = {
        version false
    }

    static constraints = {
        firstName nullable: true
        lastName nullable: true
        email unique: true
        authToken nullable: true
        imageUrl nullable: true, blank: false
    }
}
