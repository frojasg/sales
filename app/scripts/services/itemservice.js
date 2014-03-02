'use strict';

angular.module('salesApp')
  .service('Itemservice', function Itemservice($http) {
    this.items = function() {
      var promise = $http.get('/items').then(function(response) {
        console.log(response);
        return response.data;
      });
      return promise
    };
  });
