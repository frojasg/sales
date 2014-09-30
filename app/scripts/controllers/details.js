'use strict';

angular.module('salesApp')
  .controller('DetailsCtrl', function ($scope, $routeParams, $location, ItemService, CartService, UserService) {
    //TODO: ugh, duplicate code, I need to find a way to share constant
    //TODO: Also i have no idea why i'm not using a local copy of this image
    $scope.defaultImage = 'https://mashedmusings.files.wordpress.com/2012/03/christmas-shopping-for-women-3.jpg';
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.itemId = $routeParams.itemId;

    ItemService.item($scope.itemId).then(function(item) {
      $scope.item = item;
      if(item.images.length === 0) {
        $scope.addDefaultImage();
      } else {
        item.images.forEach($scope.addSlide);
      }
    });

    $scope.addDefaultImage = function() {
      $scope.addSlide({url: $scope.defaultImage, capture: ''});
    };

    $scope.cleanSlides = function() {
      slides.splice(0, slides.length);
    };

    $scope.addSlide = function(image) {
      slides.push({
        image: image.url,
        text: image.capture
      });
    };

    $scope.buy = function() {
      UserService.login().then(function() {
        CartService.clean();
        CartService.add($scope.item);
        CartService.checkout().then(function() {
        });
      }, function() {
        //the user is not logged in so we do nothing
      });
    };


  });
