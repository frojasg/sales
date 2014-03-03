'use strict';

angular.module('salesApp')
  .controller('MainCtrl', function (Itemservice, $scope) {
    Itemservice.items().then(function(items) {
      $scope.items = items;
      var index = 0;
      $scope.splitted = [];
      $scope.splitted[index] = [];
      for(var i = 0; i < $scope.items.length; i++) {
        var item = $scope.items[i];
        $scope.splitted[index].push(item);
        if(i!== 0 && i % 2 === 0) {
          index++;
          $scope.splitted[index] = [];
        }
      }
    });
    $scope.default_image = "https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg";

  });
