(function() {
    'use strict';
    angular
        .module('myApp').controller('userPageController', userPageController);
    function userPageController($rootScope, $http, $location, $window, userFactory, urlFactory) {


        var up = this;

        up.refresh = refresh;
        up.remove = removeUser;
        up.edit = editUser;
        up.update = updateUser;
        up.createUrl = createUrl;
        up.removeUrl = removeUrl;
        up.getAllUrlByUserId = getAllUrlByUserId;



        if(!$window.localStorage.getItem('key')){$location.path('/home');}

        $rootScope.userInsideId = $window.localStorage.getItem('userInside');

        function refresh() {
            if($window.localStorage.getItem('key')) {
                userFactory.getUsers().then(function (response) {
                    up.contactlist = response.data;
                });
                userFactory.getUserById().then(function (response) {
                    up.userInTheHouse = response.data;
                });
            }
        }
        refresh();





        function removeUser(id) {
            if(!$window.localStorage.getItem('key')){$location.path('/home');}
            userFactory.remove(id).then(seccess, err);
            function seccess() {
                urlFactory.deleteUrlByUserId(id);

                if (id === $rootScope.userInsideId){
                    $window.localStorage.clear();
                    $location.path('/home');
                }
                else {
                    refresh();
                    getAllUrlByUserId();
                }
            }
            function err(err) {
                console.log('Something wrong with remove user');
                console.log(err);
            }
        }



        function editUser(id) {
            if(!$window.localStorage.getItem('key')){$location.path('/home');}
            up.ShowEdit = true;
            userFactory.edit(id).then(editSeccess, err);
            function editSeccess(response) {
                if (response) {
                    up.editUser = response.data;
                }
            }
            function err(err) {
                console.log('Something wrong with edit ');
                console.log(err);
            }
        }


        function updateUser(id, contact) {
            if(!$window.localStorage.getItem('key')){$location.path('/home');}
            up.ShowEdit = false;
            userFactory.update(id, contact).then(updateSeccess, err);
            function updateSeccess() {
                refresh();
            }
            function err(err) {
                console.log('Something wrong with update user');
                console.log(err);
            }
        }

        function createUrl(url) {
            if(!$window.localStorage.getItem('key')){$location.path('/home');}
            urlFactory.createUrl(url).then(createUrlseccess, err);
            function createUrlseccess(response) {
                getAllUrlByUserId();
                up.contact.link = '';
            }
            function err(err) {
                console.log('Something wrong with createUrl');
                console.log(err);
            }
        }

        function removeUrl(id) {
            if(!$window.localStorage.getItem('key')){$location.path('/home');}
            urlFactory.deleteUrlById(id).then(seccess, err);
            function seccess() {
                getAllUrlByUserId();
            }
            function err() {
                console.log('Something wrong with deleteUrlById');
                console.log(err);
            }
        }


        function getAllUrlByUserId() {
            urlFactory.getAllUrlByUserId().then(function (response) {
                up.urllist = response.data;
            });
        }
        getAllUrlByUserId();


        if ($window.localStorage.getItem('key')) {
            up.showLoginIn = false;
            up.loginstration = false;
            up.loginout = true;
            up.showFormForCreateUrl = true;
            up.Settings = true;
            up.ShowAllcontacts = true;

        }
        up.showcontacts = function () {
            up.iminside = true;
            up.ShowEdit = false;
            up.HideAllcontacts = true;
            up.ShowAllcontacts = false;
            up.ShowUsers = true;
            up.ShowSettings = false;

        };
        up.hidecontacts = function () {
            up.iminside = false;
            up.HideAllcontacts = false;
            up.ShowAllcontacts = true;

        };

        up.userLoginGoOut = function () {

            $window.localStorage.clear();
            $location.path('/home');

            up.iminside = false;
            up.showLoginIn = true;
            up.loginstration = true;
            up.loginout = false;
            up.ShowAllcontacts = false;
            up.HideAllcontacts = false;
            up.Settings = false;
            up.contact = '';

        };

        up.showsett = function () {
            if (up.ShowUsers) {
                up.ShowUsers = false;

            }
            if (up.ShowSettings) {
                up.ShowSettings = false;
                up.iminside = false;
            }
            else {
                up.ShowSettings = true;
                up.iminside = true;
            }

        };


    }
})();