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
      }).otherwise({
        redirectTo: '/'
      });
  })
  .config(['FacebookProvider', function(FacebookProvider) {
    FacebookProvider.init('824731804211006');
  }]);
