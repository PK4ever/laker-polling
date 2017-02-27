<%@ page import="javax.swing.text.html.CSS" %>
<!DOCTYPE html>
<html lang="en" ng-app="mainApp" ng-controller="AppCtrl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <!--for SEO: tells search engines that we are using ajax calls and so it should crawl our webapp appropriately.-->
    <meta name="fragment" content="!">
    <title ng-bind="title">Laker Polling</title>
    <meta property="description"
          content="Clicker System for SUNY Oswego built by Lakers.">
    <base href="/">
    <meta name="keywords"
          content="Clicker System for SUNY Oswego built by Lakers"/>
    <meta property="og:url" content="laker-polling.com">
    <meta property="og:title" content="Laker Polling">
    <meta property="og:description" content="Clicker for Laker">

    <meta property="og:image" content="${resource(dir: 'clientapp', file: 'img/logo.png')}">
    <meta property="og:image:width" content="1500">
    <meta property="og:image:height" content="1500">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Laker Polling">

    <!--============GOOGLE SIGN IN=========-->
    %{--<meta name="google-signin-scope" content="profile email">--}%
    <!-- <meta name="google-signin-client_id" content="460384913941-o01p3pu021rrnq6ibbanenfrmg6r87at.apps.googleusercontent.com"> -->
    %{--<meta name="google-signin-client_id"content="896100416043-v0cvdf52tteag7ha8939fog24sr7bm2g.apps.googleusercontent.com">--}%


    <!-- ============== START javax.swing.text.html.CSS Resources ============== -->
    <meta property="og:image:secure_url" content="${resource(dir: 'clientapp', file: 'img/logo.png')}">
    <meta property="og:image:type" content="${resource(dir: 'clientapp', file: 'img/logo.png')}">
    <meta property="og:image:width" content="1500">
    <meta property="og:image:height" content="1500">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Laker Polling">

    <!--============GOOGLE SIGN IN=========-->
    %{--<script src="https://apis.google.com/js/platform.js" async defer></script>--}%
    %{--<meta name="google-signin-scope" content="profile email">--}%
    <!-- <meta name="google-signin-client_id" content="460384913941-o01p3pu021rrnq6ibbanenfrmg6r87at.apps.googleusercontent.com"> -->



    <!-- ============== START CSS Resources ============== -->
    <link rel="stylesheet" href="${resource(dir: 'clientapp', file: 'css/main.css')}"/>



    <!-- Latest compiled Bootstrap and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

    <!-- ============== START NPROGRESS CSS Resources ============== -->
    <link rel="stylesheet" href="${resource(dir: 'clientapp', file: 'css/libs/nprogress/nprogress.css')}">


    <!-- ============== END NPROGRESS CSS Resources ============== -->
    <!-- ============== END CSS Resources ============== -->

    <!-- ================= Favicon ================== -->
    <!-- Standard -->
    %{--<link rel="shortcut icon" href="/img/logo.png" type="image/x-icon">--}%
    <link rel="stylesheet" href="${resource(dir: 'clientapp', file: 'img/logo.png')}">

    %{--<link rel="icon" href="/img/logo.png" type="image/x-icon">--}%
    %{--<link rel="stylesheet" href="${resource(dir: 'img/logo.png')}" type="image/x-icon">--}%



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Angular lib -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.6/angular.min.js"></script>
    <script src=" https://ajax.googleapis.com/ajax/libs/angularjs/1.4.6/angular-route.min.js"></script>

    <!--====https://github.com/rstacruz/nprogress=====-->
    %{--<script src="/grails-app/assets/clientapp/js/libs/nprogress/nprogress.js"></script>--}%
    <script src="${resource(dir: 'clientapp', file: 'js/libs/nprogress/nprogress.js')}"></script>



    <!-- Create some padding for body -->
    <style>
    body {
        /*min-height: 400px;*/
        padding-top: 70px;
    }

    navbar-nav > li > a:hover {
    "imag/png" background: white !important;
        background-color: white !important;
    }

    .dropdown-menu > li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: rgba(0, 0, 0, .44);
        white-space: nowrap;
        background: white !important;
        background-color: white !important;
    }

    .dropdown-menu > li > a:hover {
        color: #333;
        background: white !important;
        background-color: white !important;
    }
    </style>

    <script src="${resource(dir: 'clientapp', file: 'js/main.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/cookies.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/classes/User.js')}"></script>

</head>

<body>
<div class="site-main surface-container">
    <nav class="navbar navbar-fixed-top cb-l-white" style="background-color: white;">
        <div class="container">
            <div class="navbar-header" style="min-height: 60px">
                <div class="navbar-brand">
                    <a class="nav-link" ng-click="navigateToPublicLists()">
                        <img class="nav-link" src="${resource(dir: 'clientapp', file: 'img/logo.png')}"
                             style="width:32px; height:32px; position: fixed">
                        <span class="bold-title text-m" style="margin-left: 36px; font-size: 28px">Laker Polling</span>
                    </a>
                </div>
                <a id="nav-mobile-toggle" class="clean-text"
                   style="float: right;margin: 20px 30px 20px 20px;">&#9776;</a>
            </div>

            <div id="navbar" class="navbar-collapse collapse" style="min-height: 60px">
                <ul class="nav navbar-nav" style="padding-top: 10px; max-width:80%; max-height: 60px">
                    <li id="nav-link-user-dropdown-menu">
                        <div id="nav-current-user-container" style="display:none; top: -10px; position: relative;">
                            <div class="dropdown" style="position: relative; display: block; padding: 10px 15px;">
                                <button id="nav-current-user-dropdown" class="dropdown-toggle" type="button" id="menu1"
                                        data-toggle="dropdown"
                                        style="background:white; color: rgba(0,0,0,.44); border:none; border-radius: 100%">
                                    <img id="nav-current-user-image"
                                         style="width:32px; height:32px; border-radius: 100; position:relative; bottom:5px; display:none"
                                         src=""/>
                                </button>
                                <ul class="dropdown-menu clean-container" style="padding:15px 0 15px 0; left: -200px;"
                                    role="menu" aria-labelledby="menu1">
                                    <li role="presentation" style="padding-right: 20px; padding-left:20px"
                                        onclick="document.getElementById('nav-current-user-username').click()">
                                        <a id="nav-current-user-username" role="menuitem" tabindex="-1"
                                           ng-click="navigateToCurrentUserLists()" class="nav-link"
                                           style="padding-left: 0px;">Username</a>
                                    </li>
                                    <li role="presentation">
                                        <a id="nav-current-user-email" role="menuitem" tabindex="-1"
                                           ng-click="navigateToCurrentUserLists()" class="nav-link">Email</a>
                                    </li>
                                    <li role="presentation" class="divider"></li>
                                    <li role="presentation"><a id="nav-current-user-email" role="menuitem" tabindex="-1"
                                                               href="/logout" class="clean-text">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!-- <li class="active">
                <a class="nav-link"
                  ng-click="navigateToPublicLists($event)"
                  ng-href="/lists">
                  All
                </a>
              </li> -->
                    <li id="nav-link-user-only-lists-me" class="active" style="display:none">
                        <a class="nav-link"
                           ng-click="navigateToCurrentUserLists($event)"
                           ng-href="/lister/{{currentUser.getId()}}">
                            Mine
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <script type="text/javascript">
        //User.showNecessaryIndexViews();
    </script>

    <!-- Dynamically render angular.js templates -->
    <div id="ng-controller-view" class="container" style="margin-top:10px" ng-view></div>

    <!--START FOOTER-->
    <div id="footer" class="container" style="margin-bottom:20px">
        <div class="row clean-text"
             style="padding-top:15px;padding-right:0;padding-bottom:0;padding-left:0;margin-top:50px;color:#b3b3b1;font-size:12px;text-align:center;">
            <div class="col-md-1"></div>

            <div>
                <div class="container" style="max-width:850px;border-top:1px solid #e5e5e5; padding-top:10px">
                    <span ng-bind="numActiveClients"></span>

                    <p>
                        <span style="display:none">
                            Developed by CSC 480
                        </span>
                    </p>
                </div>
            </div>

            <div class="col-md-1"></div>
        </div>
    </div>
    <!--END FOOTER-->

    <!-- =================== START BELOW FOLD SCRIPTS =================== -->
    <!-- =================== START BELOW FOLD SCRIPTS =================== -->

    <!-- ================= START ANGULAR APP DEPENDENDCIES ================== -->
    <!-- ================= START ANGULAR APP DEPENDENDCIES ================== -->

    %{--<script src="/grails-app/assets/clientapp/js/libs/angular-infinite-scroll/angular-infinite-scroll.js"></script>--}%
    <script src="${resource(dir: 'clientapp', file: 'js/libs/angular-infinite-scroll/angular-infinite-scroll.js')}"></script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>


    <!-- ================= END ANGULAR APP DEPENDENDCIES ================== -->
    <!-- ================= END ANGULAR APP DEPENDENDCIES ================== -->

    <!-- ================= START ANGULAR APP SCRIPTS ================== -->
    <!-- ================= START ANGULAR APP SCRIPTS ================== -->

    <!--APP-->
    <script src="${resource(dir: 'clientapp', file: 'js/app/app.js')}"></script>
    <!--APP CONFIG-->
    <script src="${resource(dir: 'clientapp', file: 'js/app/config.js')}"></script>
    
    <!--APP SERVICES-->

    <script src="${resource(dir: 'clientapp', file: 'js/app/services/users.js')}"></script>
    <!--APP CONTROLLERS-->
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/app.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/redirect.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/dashboard/student.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/dashboard/teacher.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/login.js')}"></script>
    <script src="${resource(dir: 'clientapp', file: 'js/app/controllers/logout.js')}"></script>

    <!-- ================= END ANGULAR APP SCRIPTS ================== -->
    <!-- ================= END ANGULAR APP SCRIPTS ================== -->

    <!-- =================== END BELOW FOLD SCRIPTS =================== -->
    <!-- =================== END BELOW FOLD SCRIPTS =================== -->
</div>
</body>
</html>
