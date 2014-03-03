'use strict';

angular.module('salesApp')
  .controller('MainCtrl', function (Itemservice, $scope, _) {
    Itemservice.items().then(function(items) {
      $scope.items = items;
      var index = 0;
      $scope.splitted =  _.groupBy(items, function(item, i) {
        return Math.floor(i/3);
      });
    });
    $scope.default_image = "https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg";
  });
