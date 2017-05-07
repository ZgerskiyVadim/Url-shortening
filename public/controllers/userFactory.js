(function() {
    'use strict';
    angular
        .module('myApp').factory('userFactory', userFactory);
    function userFactory($http, $rootScope, $window, $location) {

        var factory = {
            getUsers: getUsers,
            getUserById: getUserById,
            enterLogin: enterLogin,
            addContact: addContact,
            remove: remove,
            edit: edit,
            update: update,
            getUrlByUserId: getUrlByUserId
        };
        return factory;

        function getUsers() {
            return $http.get('/user', {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }


        function getUrlByUserId() {
            return $http.get('/urls');
        }

        function enterLogin(contact) {

            return $http.post('/login', contact).then(success, err);
            function success(response) {
                if (response.data.token) {
                    $rootScope.token = response.data.token;
                    return response;
                }
            }
            function err(err) {
                return console.log('Usermane or password not correct', err);

            }
        }

        function getUserById() {
            return $http.get('/user/' + $rootScope.userInsideId, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }

        function addContact(contact) {
            return $http.post('/user', contact);
        }

        function remove(id) {
            return $http.delete('/user/' + id, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }

        function edit(id) {
            return $http.get('/user/' + id, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }

        function update(id, contact) {
            return $http.put('/user/' + id, contact, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }

    }
})();
