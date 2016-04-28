'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('AboutCtrl', function ($scope, $rootScope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if($rootScope.userName === undefined) {
		$location.path('/logout');
	}
  });
