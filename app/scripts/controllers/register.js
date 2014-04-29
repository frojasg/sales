'use strict';

angular.module('salesApp')
  .controller('RegisterCtrl', function ($scope, $timeout, $cookieStore, Facebook, UserService) {
      $scope.user = UserService.getUser();
      $scope.userService = UserService;
      $scope.logged = UserService.isLogged();

      // Defining user logged status
      $scope.$on('user.logged', function(event, user) {
        $scope.saludation = true;
        $scope.user = user;
        $scope.logged = true;
      });
      $scope.$on('user.logout', function(event) {
        $scope.byebye = true;
        $scope.user = null;
        $scope.logged = false;
        $timeout(function() {
          $scope.byebye = false;
        }, 2000)
      });
      $scope.$on('user.clean', function(event) {
        $scope.user = null;
        $scope.logged = false;
      });

      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(isReady) {
          $scope.facebookReady = isReady;
        }
      );
      $scope.login = UserService.login;
      $scope.logout = UserService.logout;
  });
