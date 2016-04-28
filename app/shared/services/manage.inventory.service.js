/*manage.inventory.service.js*/
/**
 * @ngdoc service
 */
(function() {
    'use strict';
    angular.module('bidAuctionApp').service('manageInventoryService', function($http, $q, kbconstants, Restangular) {
        Restangular = Restangular;
        var serviceUrl = 'http://localhost:3000';
    	/**
         * @ngdoc
         * @name getItemsAvailable
         * @methodOf $http.get
         * @description
         * Function to get Items available
         */
        this.getItemsAvailable = function() {
            var deferred = $q.defer();
            var productsUrl = serviceUrl + '/getAllProducts';
            var config = {
                method: 'get',
                url: productsUrl,
                headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                        }
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
         * @name getSelectedItem
         * @methodOf $http.get
         * @description
         * Function to get Item by Id
         */
        this.getSelectedItem = function(pid) {
            var deferred = $q.defer();
            var productsUrl = serviceUrl + '/getProduct/' + pid;
            var config = {
                method: 'get',
                url: productsUrl
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
         * @name getActivBidItem
         * @methodOf $http.get
         * @description
         * Function to get Item for active bid
         */
        this.getActivBidItem = function() {
            var availableItems = [];
            var error = '';
            var activeBitItem = {};
            this.getItemsAvailable().then(function(res) {
                availableItems = res;
            }, function() {
                error = 'Error found fetching data for items available';
            });

            angular.forEach(availableItems, function(eacnAvailable) {
                if (eacnAvailable.isActiveBid) {
                    activeBitItem = eacnAvailable;
                }
            });
            return activeBitItem;
        };
        /**
         * @ngdoc
         * @name updateActiveItemBid
         * @methodOf $http.get
         * @description
         * Function to update active bid column of product.
         */
        this.updateActiveItemBid = function( isab, prodId, pvpid) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/updateActiveBid/' + isab + '/' + prodId + '/' + pvpid
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
         * @name updateBidOver
         * @methodOf $http.get
         * @description
         * Function to update bid over for the product.
         */
        this.updateBidOver = function( bo, pid, qty) {
            var deferred = $q.defer();
            var config = {
                method: 'post',
                url: serviceUrl + '/bidover/' + bo + '/' + pid + '/' + qty
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