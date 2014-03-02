'use strict';

angular.module('salesApp')
  .controller('MainCtrl', function (Itemservice, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    Itemservice.items().then(function(items) {
       $scope.items = items;
    });
  });
