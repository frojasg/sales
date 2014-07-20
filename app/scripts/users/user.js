'use strict';

var app = angular.module('salesApp');

app.directive('userAlerts', function() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/users/user-alerts.html',
    controller: function($scope) {
      this.alert = false;
      self = this;
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
