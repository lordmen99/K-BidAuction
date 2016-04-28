(function() {
    'use strict';

    /*angular.module('shared.constant', []);

    angular.module('shared.directive', []);

    angular.module([]);*/

    angular.module('shared.service', ['userManagementService']);
    angular.module('bidAuctionApp.shared', ['shared.service']);
})();
