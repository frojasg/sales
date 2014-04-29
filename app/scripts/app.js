'use strict';

angular.module('salesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'underscore'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/details/:itemId', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });
