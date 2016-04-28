'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('LogoutCtrl', function ($scope, $location, $rootScope, $cookieStore) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var lovm = this;
	lovm.alerts = [];
	lovm.user = '';
	lovm.logout = function() {
		lovm.user = angular.copy($rootScope.userName);
		$rootScope.userName = undefined;
		$cookieStore.remove('kbiduser');
	};
	lovm.logout();
  });