'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('DashboardCtrl', function ($scope, $timeout, userManagementService, $location, $uibModal, 
  				manageInventoryService, $rootScope) {
  	 $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  	var dvm = this;
  	
  	dvm.alerts = [];
    dvm.bidTime = 90;
    dvm.bidOver = false;
	var stopped;
	dvm.sellerBid = 150;
	dvm.playerBid = 50;
	dvm.minBid = 10;
	dvm.availableBids = [100, 110, 120, 130, 140, 150, 200,300];
    dvm.playerName = $rootScope.userName;
    dvm.playerCoins = 10;
    dvm.sellerName = 'Seller1';
    dvm.bidMessage = 'Auction started place a bid';
    dvm.playerDetails = {};
    dvm.sellerDetails = {};
    dvm.availableItems = [];
    dvm.activeBidItem = {};
    dvm.clickCounter = 0;
    dvm.bidClicked = false;
    dvm.bidOverItem = 0;
    dvm.playerQuantity = 20; 
    dvm.confirmForm = {};
    if($rootScope.userName === undefined) {
    	$location.path('/logout');
    }
    $scope.$watch('dvm.bidTime', function() {
		if (dvm.bidTime === 0) {
	   		if(dvm.playerBid < dvm.sellerBid) {
	   			dvm.bidMessage = 'You loose the bid!! Better luck next time';
	   			dvm.alerts = [];
	   			dvm.alerts.push({ type: 'warning', msg: dvm.bidMessage });
	   			dvm.stop();
		   		dvm.bidTime = 90;
		   		dvm.bidOver =  true;
	   		}else if (dvm.playerBid === dvm.sellerBid) {
		   		dvm.bidMessage = dvm.playerName + ' Congrats you won the bid! Windding Bid is -' + dvm.playerBid;
		   		dvm.alerts = [];
	   			dvm.alerts.push({ type: 'success', msg: dvm.bidMessage });
		   		dvm.stop();
		   		dvm.bidTime = 90;
		   		dvm.bidOver =  true;
		   		dvm.bidOverItem = dvm.activeBidItem.id;
		   		dvm.playerCoins = dvm.playerCoins - dvm.playerBid;
		   } else {
	   			dvm.bidMessage = 'Sorry biding time is over!';
	   			dvm.alerts = [];
	   			dvm.alerts.push({ type: 'warning', msg: dvm.bidMessage });
	   		}
	   	}
	}, true);

    dvm.getPlayerDetails = function() {
		userManagementService.getPlayerDetails().then(function(res) {
			dvm.playerDetails = res.playerDetails;
			dvm.playerCoins = dvm.playerDetails.coins;
		}, function() {
			handleFailure('Error found fetching data of player');
		});
	};
	dvm.getSellerDetails = function() {
		userManagementService.getSellerDetails().then(function(res) {
			dvm.sellerDetails = res.sellerDetails;
			dvm.sellerName = dvm.sellerDetails.name;
		}, function() {
			handleFailure('Error found fetching data of Sellers');
		});
	};
	dvm.getItemsAvailable = function() {
		manageInventoryService.getItemsAvailable().then(function(res) {
			dvm.availableItems = res;
			dvm.setActiveBidItem();
		}, function() {
			handleFailure('Error found fetching data for items available');
		});
	};
	dvm.setActiveBidItem = function() {
		angular.forEach(dvm.availableItems, function(eachAvailable) {
            if (eachAvailable.isActiveBid) {
                dvm.activeBidItem = eachAvailable;
                dvm.playerBid = dvm.activeBidItem.minBid;
                if (dvm.availableBids.indexOf(dvm.activeBidItem.minBid) === -1) {
                	dvm.availableBids.push(dvm.activeBidItem.minBid);
            	}
            }
        });
	};
	dvm.startAuction = function(item) {
		if (dvm.bidTime === 90 ) {
			dvm.alerts = [];
			var uptodateItems = [];
			angular.forEach(dvm.availableItems, function(eachAvailable) {
	            if (eachAvailable.isActiveBid === 'true') {
	                eachAvailable.isActiveBid =  'false';
	            }
	            if (eachAvailable.id === item.id) {
	            	eachAvailable.isActiveBid =  'true';
	            	dvm.activeBidItem = eachAvailable;
					dvm.playerBid = dvm.activeBidItem.minBid;
					if (dvm.availableBids.indexOf(dvm.activeBidItem.minBid) === -1) {
			        	dvm.availableBids.push(dvm.activeBidItem.minBid);
			    	}
			    	dvm.bidOver =  false;
			    	dvm.disableBidBtn = false;
	            } 
	            uptodateItems.push(eachAvailable);
	        });
	        dvm.availableItems = uptodateItems;
	    }else {
	    	dvm.alerts = [];
	   		dvm.alerts.push({ type: 'danger', msg: 'Bid is running please wait for end of current bid' });
	    }
	};
    dvm.countdown = function() {
    	dvm.alerts = [];
    	dvm.disableBidBtn = true;
    	if (dvm.playerBid > dvm.sellerBid) {
	   		dvm.bidMessage = 'Congrats you won the bid!';
	   		dvm.alerts = [];
	   		dvm.alerts.push({ type: 'success', msg: dvm.bidMessage });
	   		dvm.stop();
	   		dvm.bidTime = 90;
	   		dvm.bidOver =  true;
	   		dvm.disableBidBtn = true;
	   } else {
	   		if (dvm.bidTime === 0) {
	   			dvm.disableBidBtn = false;
	   		}else if (dvm.bidTime > 0){
			   	stopped = $timeout(function() {
				    dvm.bidTime--;
				    dvm.countdown();
				}, 1000);
		   	}
	   	}

	};

	dvm.modalOpen = function(item) {
		dvm.selectedBidItem = item;
		dvm.modalInstance = $uibModal.open({
			templateUrl: 'auctionConfirm.html',
			controller: /*@ngInject*/ function($scope, $uibModalInstance, selecteItem) {
				$scope.sItem = selecteItem;
				$scope.modalYes = function() {
					$uibModalInstance.close('Yes');
				};
				$scope.modalNo = function() {
					$uibModalInstance.close('No');
				};
				$scope.modalCancel = function() {
					$uibModalInstance.dismiss('Cancel');
				};
			},
			size: '300',
			backdrop: 'static',
			animation: true,
			resolve: {
						selecteItem: function() {
							return item;
						}
					}
		});
		dvm.modalInstance.result.then(function(selOption) {
			console.log(selOption);
			if (selOption === 'Yes') {
				dvm.playerQuantity = confirmForm.plQuantity.value;
				dvm.minBid = confirmForm.plMinBid.value;
				dvm.startAuction(dvm.selectedBidItem);
			}else if (selOption === 'Cancel') {
				return false;
			}
		});
	};
	// Activate the view
	(function activate() {
		dvm.getPlayerDetails();
		dvm.getSellerDetails();
		dvm.getItemsAvailable();
	})();

	dvm.stop = function(){
   		$timeout.cancel(stopped);
    };
    function handleFailure(errorMsg) {
		dvm.bidMessage = errorMsg;
		dvm.alerts = [];
	   	dvm.alerts.push({ type: 'danger', msg: dvm.bidMessage });
	}
	dvm.closeAlert = function(index) {
	    dvm.alerts.splice(index, 1);
	};
  });
