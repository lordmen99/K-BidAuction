/*manage.inventory.service.js*/
/**
 * @ngdoc service
 */
(function() {
    'use strict';
    angular.module('bidAuctionApp').service('auctionDataService', function($http, $q, kbconstants, Restangular) {
        Restangular = Restangular;
        var serviceUrl = 'http://localhost:3000';
    	/**
         * @ngdoc
         * @name getWindingBid
         * @methodOf $http.get
         * @description
         * Function to get Winding Bid Details
         */
        this.getWinningBid = function(auid, prodId, lbid) {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: serviceUrl + '/getWiningBid/' + auid + '/' + prodId + '/' + lbid
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
         * @name getActiveBidDetails
         * @methodOf $http.get
         * @description
         * Function to get Active Bid Details
         */
        this.getActiveBidDetails = function() {
            var deferred = $q.defer();
            var config = {
                method: 'get',
                url: serviceUrl + '/getAcitiveBid/'
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
         * @name inertBid
         * @methodOf $http.get
         * @description
         * Function to insert player Bid.
         */
        this.inertBid = function( lbid, prodId, userId, auid) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/insertBid/' + lbid + '/' + prodId + '/' + userId + '/' + auid
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
         * @name inertAuction
         * @methodOf $http.get
         * @description
         * Function to insert auction.
         */
        this.inertAuction = function(sbid) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/insertAuction/' + sbid + '/false'
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