'use strict';

var app = angular.module('salesApp');

app.directive('userAlerts', function() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/users/user-alerts.html',
    controller: function($scope) {
      this.alert = false;
      var self = this;
      this.closeAlert = function() {
        this.alert = false;
      };
      $scope.$on('user.not_authorized', function() {
        self.alert = true;
      });
    },
    controllerAs: 'alerts'
  };
});

app.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/users/navbar.html',
    controller: function($scope, Facebook, UserService, $timeout) {
      $scope.user = UserService.getUser();
      $scope.userService = UserService;
      $scope.logged = UserService.isLogged();
      $scope.alert = false;
      this.scope = $scope;
      var self = this;

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
    },
    controllerAs: 'nav'
  };
});
