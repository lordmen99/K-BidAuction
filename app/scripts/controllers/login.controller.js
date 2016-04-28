'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('LoginCtrl', function ($scope, $location, $rootScope, $cookieStore) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var lvm = this;
	lvm.alerts = [];

	lvm.userId = '';
	lvm.password = '';
	lvm.login = function() {
		if($cookieStore.get('kbiduser') === lvm.userId){
			$location.path('/logout');
		}else {
			$rootScope.userName = lvm.userId;
			$cookieStore.put('kbiduser', lvm.userId);
			$location.path('/dashboard');
		}
	};
  });