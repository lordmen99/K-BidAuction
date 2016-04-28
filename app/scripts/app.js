'use strict';

/**
 * @ngdoc overview
 * @name bidAuctionApp
 * @description
 * # bidAuctionApp
 *
 * Main module of the application.
 */
angular
  .module('bidAuctionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngCookies',
    'restangular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controllerAs: 'lvm',
        controller: 'LoginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'modules/products/products.html',
        controllerAs: 'dvm',
        controller: 'ProductsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/logout', {
        controller: 'LogoutCtrl',
        controllerAs: 'lovm',
        templateUrl: 'views/logout.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('LoginCtrl', function ($scope, $location, $rootScope) {
      if($rootScope.userName === undefined) {
        $location.path('/logout');
      }
  });