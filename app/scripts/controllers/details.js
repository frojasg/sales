'use strict';

angular.module('salesApp')
  .controller('DetailsCtrl', function ($scope, $routeParams, ItemService) {
    //TODO: ugh, duplicate code, I need to find a way to share constant
    //TODO: Also i have no idea why i'm not using a local copy of this image
    $scope.default_image = "https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg";
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.item_id = $routeParams.item_id;

    ItemService.item($scope.item_id).then(function(item) {
      $scope.item = item;
      if(item.images.length == 0) {
        $scope.addDefaultImage();
      } else {
        item.images.forEach($scope.addSlide);
      }
    });

    $scope.addDefaultImage = function() {
      $scope.addSlide({url: $scope.default_image, capture: ''});
    }

    $scope.cleanSlides = function() {
      slides.splice(0, slides.length);
    };

    $scope.addSlide = function(image) {
      slides.push({
        image: image.url,
        text: image.capture
      });
    };
  });
