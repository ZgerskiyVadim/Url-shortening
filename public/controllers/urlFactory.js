(function() {
    'use strict';
    angular
        .module('myApp').factory('urlFactory', urlFactory);
    function urlFactory($http, $rootScope, $window, $location) {

        var ufactory = {
            createUrl: createUrl,
            redirectURl: redirectURl,
            getAllUrlByUserId: getAllUrlByUserId,
            updateUrlById: updateUrlById,
            deleteUrlByUserId: deleteUrlByUserId,
            deleteUrlById: deleteUrlById
        };

        return ufactory;

        function createUrl(url) {
            return $http.post('/url', url, {headers:{'x-access-token': $window.localStorage.getItem('key')}}).then(seccess, err);
            function seccess(response) {
                if ($rootScope.token) {
                    return response;
                }
            }
            function err(err) {
                console.log('Something wrong with create url');
                console.log(err);
            }
        }


        function redirectURl(shortlink) {
            return $http.get('/url/:shortlink', shortlink, {headers:{'x-access-token': $window.localStorage.getItem('key')}}).then(seccess, err);
            function seccess(response) {
                return response;
            }
            function err(err) {
                console.log('Something wrong with redirectUrl');
                console.log(err);
            }
        }

        function getAllUrlByUserId() {
            return $http.get('/url/byUser/' + $rootScope.userInsideId, {headers:{'x-access-token': $window.localStorage.getItem('key')}}).then(seccess, err);
            function seccess(response) {
                return response;
            }
            function err(err) {
                console.log('Something wrong with getAllUrlByUserId');
                console.log(err);
            }
        }

        function updateUrlById(id) {
            return $http.put('/url/' + id, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }

        function deleteUrlByUserId(id) {
            return $http.delete('/url/byUsera/' + id, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }
        
        function deleteUrlById(id) {
            return $http.delete('/url/' + id, {headers:{'x-access-token': $window.localStorage.getItem('key')}});
        }
        
    }
})();