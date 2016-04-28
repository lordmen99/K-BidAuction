'use strict';

/**
 * @ngdoc function
 * @name bidAuctionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bidAuctionApp
 */
angular.module('bidAuctionApp')
  .controller('ProductsCtrl', function ($scope, $timeout, userManagementService, $location, $uibModal, 
  				manageInventoryService, auctionDataService, $rootScope) {
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
	var stopTime;
	dvm.sellerBid = 150;
	dvm.playerBid = 50;
	dvm.minBid = 10;
	dvm.availableBids = [100, 110, 120, 130, 140, 150, 200,300];
    dvm.playerName = $rootScope.userName;
    dvm.playerId = 1;
    dvm.playerCoins = 1000;
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
    dvm.plQuantity = 0;
    dvm.plMinBid = 0;
    dvm.showModal = false;
    dvm.currentAuctionId = 0;
    dvm.bidType = 'Minimum';
    dvm.selProductSrc = '';
    
    if($rootScope.userName === undefined) {
    	$location.path('/logout');
    }
    $scope.$watch('dvm.bidTime', function() {
    	if(dvm.bidTime !== 90){
   			dvm.bidType = 'Winning';
   			stopTime = $timeout(function() {
			    getWinBidDetails();
			}, 1000);
   		}
		if (dvm.bidTime === 0) {
			auctionDataService.getWinningBid(dvm.currentAuctionId, dvm.activeBidItem.id, dvm.latestBid).then(function(res) {
				if(res.wVal !== undefined) {
					dvm.latestBid = res.wVal;
					dvm.winnerName = res.wName;
					if (res.wVal >= dvm.sellerBid) {
						dvm.bidMessage = ' Congrats ' + dvm.winnerName + '! won the bid! Winning Bid is - ' + dvm.latestBid;
				   		dvm.alerts = [];
			   			dvm.alerts.push({ type: 'success', msg: dvm.bidMessage });
			   			dvm.bidOver =  true;
				   		dvm.bidOverItem = dvm.activeBidItem.id;
				   		dvm.playerCoins = dvm.playerCoins - dvm.playerBid;
				   		var wqty = dvm.activeBidItem.quantity - dvm.playerQuantity;
				   		dvm.updateBidOverItem('true', dvm.activeBidItem.id, wqty);
				   		dvm.updatePlayerCoins(dvm.playerCoins, dvm.playerId);
				   		dvm.getItemsAvailable();
					}else {
						dvm.bidMessage = 'Sorry biding time is over!';
						dvm.alerts = [];
	   					dvm.alerts.push({ type: 'warning', msg: dvm.bidMessage });
					}
				}else {
					dvm.winnerName = dvm.playerName;
					if (dvm.playerBid >= dvm.sellerBid) {
						dvm.bidMessage = ' Congrats ' + dvm.winnerName + ' won the bid! Windding Bid is -' + dvm.latestBid;
				   		dvm.alerts = [];
			   			dvm.alerts.push({ type: 'success', msg: dvm.bidMessage });
			   			dvm.bidOver =  true;
				   		dvm.bidOverItem = dvm.activeBidItem.id;
				   		dvm.playerCoins = dvm.playerCoins - dvm.playerBid;
				   		var pqty = dvm.activeBidItem.quantity - dvm.playerQuantity;
				   		dvm.updateBidOverItem('true', dvm.activeBidItem.id, pqty);
				   		dvm.updatePlayerCoins(dvm.playerCoins, dvm.playerId);
				   		dvm.getItemsAvailable();
					}else {
						dvm.bidMessage = 'You loose the bid!! Better luck next time!';
						dvm.alerts = [];
	   					dvm.alerts.push({ type: 'warning', msg: dvm.bidMessage });
					}
				}
				dvm.stop();
				dvm.stopInt();
		   		dvm.bidTime = 90;
		   		dvm.bidType = 'Minimum';
			}, function() {
				handleFailure('Error found fetching data of Sellers');
			});
	   	}
	}, true);

    dvm.getPlayerDetails = function() {
		userManagementService.getPlayerDetails(dvm.playerName).then(function(res) {
			if(res.id !== undefined) {
				dvm.playerDetails = res;
				dvm.playerCoins = dvm.playerDetails.coins;
				dvm.playerId = dvm.playerDetails.id;
			}else {
				dvm.playerId = res[0].id+1;
				dvm.playerCoins = 1000;
			}
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
		}, function() {
			handleFailure('Error found fetching data for items available');
		});
	};
	function getWinBidDetails() {
		auctionDataService.getWinningBid(dvm.currentAuctionId, dvm.activeBidItem.id, dvm.latestBid).then(function(res) {
			if(res.wVal !== undefined) {
				dvm.latestBid = res.wVal;
				dvm.winnerName = res.wName;
			}
		}, function() {
			handleFailure('Error found fetching data of Sellers');
		});
	}
	dvm.insertAuction = function() {
		auctionDataService.inertAuction(dvm.sellerBid).then(function(res) {
			console.log(res);
			dvm.currentAuctionId = res.curauid;
		}, function() {
			handleFailure('Error found insert auction');
		});
	};
	dvm.updateActivItem = function(isab, pid, pvpid) {
		manageInventoryService.updateActiveItemBid(isab, pid, pvpid).then(function(res) {
			console.log(res);
		}, function() {
			handleFailure('Error found fetching data for items available');
		});
	};
	dvm.updateBidOverItem = function(bo, pid, qty) {
		manageInventoryService.updateBidOver(bo, pid, qty).then(function(res) {
			console.log(res);
		}, function() {
			handleFailure('Error found updating bid over for item');
		});
	};
	dvm.updatePlayerCoins = function(lstCoins, plid) {
		userManagementService.updatePlayerCoins(lstCoins, plid).then(function(res) {
			console.log(res);
		}, function() {
			handleFailure('Error found updating player datas');
		});
	};
	dvm.insertAuction = function(sBid) {
		auctionDataService.inertAuction(sBid).then(function(res) {
			console.log(res);
			dvm.currentAuctionId = res.curauid;
		}, function() {
			handleFailure('Error found insert auction');
		});
	};
	dvm.getActiveBidData = function() {
		auctionDataService.getActiveBidDetails().then(function(res) {
			console.log(res);
			if (res.actBidtime > 0) {
				dvm.bidTime = res.actBidtime;
				dvm.currentAuctionId = res.auctionId;
				manageInventoryService.getSelectedItem(res.productId).then(function(sProdRes) {
					dvm.activeBidItem = sProdRes;
					dvm.selProductSrc = dvm.activeBidItem.imageUrl;
				});
				dvm.countdown();
				dvm.bidOver =  false;
				dvm.disableBidBtn = false;
			}
		}, function() {
			handleFailure('Error found insert auction');
		});
	};
	dvm.placeBid = function() {
		if (dvm.playerBid < dvm.latestBid) {
			dvm.alerts = [];
	   		dvm.alerts.push({ type: 'warning', msg: 'Please enter more than ' +  dvm.latestBid});
		}else {
			dvm.latestBid = dvm.playerBid;
			auctionDataService.inertBid(dvm.playerBid, dvm.activeBidItem.id, dvm.playerId, dvm.currentAuctionId).then(function(res) {
				console.log(res);
			}, function() {
				handleFailure('Error found placing bid');
			});
			dvm.disableBidBtn = true;
			dvm.countdown();
		}
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
		dvm.alerts = [];
		if (dvm.activeBidItem.id === undefined) {
			dvm.activeBidItem.id = 1;
		}
		dvm.updateActivItem('true', item.id, dvm.activeBidItem.id);
		item.isActiveBid = true;
		dvm.insertAuction(item.sellerBid);
        dvm.getItemsAvailable();
        dvm.activeBidItem = item;
		dvm.playerBid = dvm.activeBidItem.minBid;
		dvm.sellerBid = dvm.activeBidItem.sellerBid;
		dvm.selProductSrc = dvm.activeBidItem.imageUrl;
		dvm.bidOver =  false;
		dvm.disableBidBtn = false;
	};
    dvm.countdown = function() {
   		if (dvm.bidTime === 0) {
   			dvm.disableBidBtn = false;
   		}else if (dvm.bidTime > 0){
		   	stopped = $timeout(function() {
			    dvm.bidTime--;
			    dvm.countdown();
			}, 1000);
	   	}
	};

	dvm.modalOpen = function(item) {
		if (dvm.bidTime === 90 ) {
			dvm.selectedBidItem = item;
			dvm.modalInstance = $uibModal.open({
				templateUrl: 'auctionConfirm.html',
				controller: /*@ngInject*/ function($scope, $uibModalInstance, selectedItem) {
					$scope.sItem = selectedItem;
					$scope.plQuantity = 10;
					$scope.plMinBid = 5;
					$scope.modalYes = function() {
						$uibModalInstance.close(selectedItem);
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
							selectedItem: function() {
								return item;
							}
						}
			});
			dvm.modalInstance.result.then(function(selOption) {
				console.log(selOption);
				var plQuantity = angular.element('.modalQuantity')[0].value;
				var plMinBid = angular.element('.modalMinBid')[0].value;
				if (selOption !== 'Cancel') {
					dvm.disableBidBtn = true;
					dvm.playerQuantity = plQuantity;
					dvm.minBid = plMinBid;
					dvm.latestBid = plMinBid;
					dvm.playerBid = dvm.minBid;
					dvm.startAuction(selOption);
				}else if (selOption === 'Cancel') {
					return false;
				}
			});
		}else {
	    	dvm.alerts = [];
	   		dvm.alerts.push({ type: 'danger', msg: 'Bid is running please wait for end of current bid' });
	    }
	};
	// Activate the view
	(function activate() {
		dvm.getPlayerDetails();
		dvm.getSellerDetails();
		dvm.getItemsAvailable();
		dvm.getActiveBidData();
	})();

	dvm.stop = function(){
   		$timeout.cancel(stopped);
    };
    dvm.stopInt = function(){
   		$timeout.cancel(stopTime);
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
