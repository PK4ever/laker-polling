server {
    port = 8080 //change this if you need.
}

googleauth {
    clientId = '896100416043-v0cvdf52tteag7ha8939fog24sr7bm2g.apps.googleusercontent.com'
    issuer = 'accounts.google.com'
}

dataSource {
    pooled = true
    jmxExport = true
    driverClassName = 'org.h2.Driver'
//    dialect = 'org.hibernate.dialect.MySQL5InnoDBDialect'
    username = 'sa'
    password = ''
}

environments {

    development {
        dataSource {
            dbCreate = 'create-drop'
            url = 'jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE'
        }
    }

    test {
        dataSource {
            dbCreate = 'update'
            url = 'jdbc:mysql://<Your db address here>:<Your db port here>/<Your db name here>'
        }
    }

    production {
        dataSource {
            dbCreate = 'none'
            url = 'jdbc:mysql://<Your db address here>:<Your db port here>/<Your db name here>'
            properties {
                jmxEnabled = trueserver {
    port = 8080 //change this if you need.
}

googleauth {
    clientId = 'Your client id here'
    issuer = 'https://accounts.google.com'
}

dataSource {
    pooled = true
    jmxExport = true
    driverClassName = 'com.mysql.jdbc.Driver'
    dialect = 'org.hibernate.dialect.MySQL5InnoDBDialect'
    username = '<Your db username here>'
    password = 'Your db password here'
}

environments {

    development {
        dataSource {
            dbCreate = 'create-drop'
            url = 'jdbc:mysql://<Your db address here>:<Your db port here>/<Your db name here>'
        }
    }

    test {
        dataSource {
            dbCreate = 'update'
            url = 'jdbc:mysql://<Your db address here>:<Your db port here>/<Your db name here>'
        }
    }

    production {
        dataSource {
            dbCreate = 'none'
            url = 'jdbc:mysql://<Your db address here>:<Your db port here>/<Your db name here>'
            properties {
                jmxEnabled = true
                initialSize = 5
                maxActive = 50
                minIdle = 5
                maxIdle = 25
                maxWait = 10000
                maxAge = 600000
                timeBetweenEvictionRunsMillis = 5000
                minEvictableIdleTimeMillis = 60000
                validationQuery = 'SELECT 1'
                validationQueryTimeout = 3
                validationInterval = 15000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
                jdbcInterceptors = 'ConnectionState'
                defaultTransactionIsolation = '2 # TRANSACTION_READ_COMMITTED'
            }
        }
    }

}
                initialSize = 5
                maxActive = 50
                minIdle = 5
                maxIdle = 25
                maxWait = 10000
                maxAge = 600000
                timeBetweenEvictionRunsMillis = 5000
                minEvictableIdleTimeMillis = 60000
                validationQuery = 'SELECT 1'
                validationQueryTimeout = 3
                validationInterval = 15000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
                jdbcInterceptors = 'ConnectionState'
                defaultTransactionIsolation = '2 # TRANSACTION_READ_COMMITTED'
            }
        }
    }

}