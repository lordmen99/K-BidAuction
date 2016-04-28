/*auction.usermanagement service .js*/
/**
 * @ngdoc service
 */
(function() {
    'use strict';
    angular.module('bidAuctionApp').service('userManagementService', function($http, $q, kbconstants, Restangular) {
        Restangular = Restangular;

    	/**
         * @ngdoc
         * @name getPlayerDetails
         * @methodOf $http.get
         * @description
         * Function to get Player Details
         */
        this.getPlayerDetails = function() {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: '/api/userManagement/playerDetails.json'
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