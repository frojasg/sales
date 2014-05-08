'use strict';

angular.module('salesApp')
  .controller('MainCtrl', function (ItemService, $scope, _) {
    ItemService.items().then(function(items) {
      $scope.items = items;
      $scope.splitted =  _.groupBy(items, function(item, i) {
        return Math.floor(i/3);
      });
    });
    $scope.default_image = "https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg";
  });
