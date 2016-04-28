'use strict';

angular.module('bidAuctionApp').controller('ModalResultInstanceCtrl', function($scope, $uibModalInstance, params) {

  $scope.searchTerm = params.searchTerm;

  $scope.ok = function() {
    $uibModalInstance.close($scope.searchTerm);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});