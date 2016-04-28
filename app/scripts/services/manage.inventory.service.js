/*manage.inventory.service.js*/
/**
 * @ngdoc service
 */
(function() {
    'use strict';
    angular.module('bidAuctionApp').service('manageInventoryService', function($http, $q, kbconstants, Restangular) {
        Restangular = Restangular;

    	/**
         * @ngdoc
         * @name getItemsAvailable
         * @methodOf $http.get
         * @description
         * Function to get Items available
         */
        this.getItemsAvailable = function() {
            var deferred = $q.defer();
            var productsUrl = 'http://localhost:3000/getAllProducts';
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
    });
 })();