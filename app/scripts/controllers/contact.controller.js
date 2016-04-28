'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('ContactCtrl', function ($scope, $rootScope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if($rootScope.userName === undefined) {
		$location.path('/logout');
	}
  });
