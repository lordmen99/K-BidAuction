/*auction.usermanagement service .js*/
/**
 * @ngdoc service
 */
(function() {
    'use strict';
    angular.module('bidAuctionApp').service('userManagementService', function($http, $q, kbconstants, Restangular) {
        Restangular = Restangular;
        var serviceUrl = 'http://localhost:3000';
    	/**
         * @ngdoc
         * @name getPlayerDetails
         * @methodOf $http.get
         * @description
         * Function to get Player Details
         */
        this.getPlayerDetails = function(playerName) {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: serviceUrl + '/getPlayer/'+playerName
            };
            $http(config)
                .success(function(data, status, headers, config) {
                    /* jshint unused:vars */
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        this.getUser = function(userName) {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: serviceUrl + '/getPlayer/'+userName
            };
            $http(config)
                .success(function(data, status, headers, config) {
                    /* jshint unused:vars */
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        this.insertNewUser = function(userName) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/insertUser/' + userName + '/1000' + '/true'  
            };
            $http(config)
                .success(function(data, status, headers, config) {
                    /* jshint unused:vars */
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };
        /**
         * @ngdoc
         * @name updatePlayerCoins
         * @methodOf $http.get
         * @description
         * Function to update Player coins.
         */
        this.updatePlayerCoins = function(coins, plid) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/updatePlayerCoins/' + coins + '/' + plid
            };
            $http(config)
                .success(function(data, status, headers, config) {
                    /* jshint unused:vars */
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        /**
         * @ngdoc
         * @name getSellerDetails
         * @methodOf $http.get
         * @description
         * Function to get Seller Details
         */
        this.getSellerDetails = function() {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: '/api/userManagement/sellerDetails.json'
            };
            $http(config)
                .success(function(data, status, headers, config) {
                    /* jshint unused:vars */
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };
    });
 })();