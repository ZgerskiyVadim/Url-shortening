'use strict';
angular
    .module('myApp').controller('mainController', mainController);
function mainController($scope, $http, $location, $window, $rootScope, userFactory) {
    
    if($window.localStorage.getItem('key')){$location.path('/userInside');}
    else {$location.path('/home');}
    
    var vm = this;
    vm.enterLogin = enterLogin;
    vm.addContact = addContact;
    vm.refresh = refresh;
    vm.getUrlByUserId = getUrlByUserId;
    
    function refresh() {
        if($window.localStorage.getItem('key')) {
            userFactory.getUsers().then(function (response) {
                vm.contactlist = response.data;
            });
        }
    }


    function getUrlByUserId() {
        userFactory.getUrlByUserId().then(function (response) {
            vm.listUrl = response.data;
        });
    }
    getUrlByUserId();


    function enterLogin(contact) {

        userFactory.enterLogin(contact).then(seccess, err);
        function seccess(response) {
            if($rootScope.token){
                $location.path('/userInside');
                $window.localStorage.setItem('userInside', response.data.user._id);
                $rootScope.userInsideId = $window.localStorage.getItem('userInside');
                $window.localStorage.setItem('key', response.data.token);
            }
        }
        function err(err) {
            console.log('err', err);
        }

    }
    refresh();


    function addContact(contact) {

        userFactory.addContact(contact).then(seccess, err);
        function seccess(response) {
            if (response) {
                vm.showLoginIn = true;
                vm.showRegistration = false;
            }
        }
        function err(err) {
            console.log('Something wrong with addContact');
            console.log(err);
        }
    }


    vm.showAllUrls = true;
    vm.Urls = true;
    vm.loginstration = true;
    vm.showLoginIn = false;
    vm.showRegistration = false;

    vm.login = function () {
        if (vm.showRegistration) {
            vm.showRegistration = false;
        }
        if (vm.showLoginIn) {
            vm.showLoginIn = false;
        }
        else {
            vm.showLoginIn = true;
        }
    };

    vm.registration = function () {
        if (vm.showLoginIn) {
            vm.showLoginIn = false;
        }
        if (vm.showRegistration) {
            vm.showRegistration = false;
        }
        else {
            vm.showRegistration = true;
        }
    };

}

