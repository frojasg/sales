'use strict';

angular.module('salesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngCookies',
  'underscore',
  'facebook'
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
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  })
  .config(['FacebookProvider', function(FacebookProvider) {
    FacebookProvider.init('824731804211006');
  }]);
