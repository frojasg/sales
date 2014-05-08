'use strict';

angular.module('salesApp')
  .controller('MainCtrl', function (ItemService, $scope, _) {
    $scope.default_image = "https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg";

    ItemService.items().then(function(items) {
      $scope.items = _.map(items, function(item) {
        item.image = function() {
          if(item.images.length > 0) {
            return item.images[0].url;
          } else {
            return $scope.default_image;
          }
        };
        return item;
      });
      $scope.splitted =  _.groupBy(items, function(item, i) {
        return Math.floor(i/3);
      });
    });
  });
