'use strict';

angular.module('bidAuctionApp')
  .factory('modalFactory', function($uibModal) {
    return {
      open: function(size, template, params) {
        return $uibModal.open({
          animation: true,
          templateUrl: template,
          controller: 'ModalResultInstanceCtrl',
          size: size,
          resolve: {
            params: function() {
              return params;
            }
          }
        });
      }
    };
  });