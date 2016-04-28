'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('LoginCtrl', function ($scope, $location, $rootScope, $cookieStore, userManagementService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var lvm = this;
	lvm.alerts = [];

	lvm.userId = '';
	lvm.password = '';
	lvm.userDetails = {};
	function checkUserExists(userName){
		userManagementService.getUser(userName).then(function(res) {
			if (res.name !== undefined) {
				lvm.userDetails = res;
			}else {
				userManagementService.insertNewUser(userName).then(function(res) {
					console.log(res);
					lvm.alerts = [];
					lvm.alerts.push({ type: 'success', msg: 'Player Logged in' });
				}); 
			}
		}, function() {
			handleFailure('Error found fetching data of user');
		});
	}
	lvm.login = function() {
		if(lvm.userId === '') {
			lvm.alerts = [];
			lvm.alerts.push({ type: 'warning', msg: 'Please enter valid User ID' });
		}else {
			lvm.alerts = [];
			if($cookieStore.get('kbiduser') === lvm.userId){
				$location.path('/logout');
			}else {
				checkUserExists(lvm.userId);
				$rootScope.userName = lvm.userId;
				$cookieStore.put('kbiduser', lvm.userId);
				$location.path('/dashboard');
			}
		}
	};
	function handleFailure(errorMsg) {
		lvm.bidMessage = errorMsg;
		lvm.alerts = [];
	   	lvm.alerts.push({ type: 'danger', msg: errorMsg });
	}
  });