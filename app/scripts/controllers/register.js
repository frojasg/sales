'use strict';

angular.module('salesApp')
  .controller('RegisterCtrl', function ($scope, $timeout, $cookieStore, Facebook, UserService) {
      $scope.user = UserService.getUser();
      $scope.userService = UserService;
      $scope.logged = UserService.isLogged();
      $scope.alert = false;
      this.scope = $scope;
      var self = this;

      // Defining user logged status
      $scope.$on('user.logged', function(event, user) {
        self.scope.saludation = true;
        self.scope.user = user;
        self.scope.logged = true;
      });

      $scope.$on('user.logout', function() {
        self.scope.byebye = true;
        self.scope.user = null;
        self.scope.logged = false;
        $timeout(function() {
          self.scope.byebye = false;
        }, 2000);
      });

      $scope.$on('user.clean', function() {
        self.scope.user = null;
        self.scope.logged = false;
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

      $scope.$on('user.not_authorized', function() {
        $scope.alert = true;
      });

      $scope.closeAlert = function() {
        $scope.alert = false;
      };
    });
