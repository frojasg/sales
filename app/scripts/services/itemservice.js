'use strict';

angular.module('salesApp')
  .service('ItemService', function ItemService($http) {
    this.items = function() {
      var promise = $http.get('/items').then(function(response) {
        return response.data;
      });
      return promise;
    };
    this.item = function(itemId) {
      var promise = $http.get('/items/'+ itemId).then(function(response) {
        return response.data;
      });
      return promise;
    };
  });
