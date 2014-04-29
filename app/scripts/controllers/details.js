'use strict';

angular.module('salesApp')
  .controller('DetailsCtrl', function ($scope, $routeParams) {
    $scope.item_id = $routeParams.item_id;


  });
