'use strict';

angular.module('salesApp')
  .controller('DetailsCtrl', function ($scope, $routeParams, ItemService) {
    $scope.item_id = $routeParams.item_id;
    ItemService.item($scope.item_id).then(function(item) {
      $scope.$apply(function () {
        $scope.item = item;
      });
    });
  });
