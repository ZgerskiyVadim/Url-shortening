'use strict';
angular
    .module('myApp', ['ngRoute'])
    .config(config);
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'mainController'
            })
            .when('/userInside', {
                templateUrl: 'userPage.html',
                controller: 'userPageController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }