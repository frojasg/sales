'use strict';

angular.module('salesApp')
  .service('ItemService', function ItemService($http) {
    this.items = function() {
      var promise = $http.get('/items').then(function(response) {
        console.log(response);
        return response.data;
      });
      return promise;
    };
    this.item = function(item_id) {
      var promise = $http.get('/items/'+ item_id).them(function(item) {
        console.log(item);
        return response.data;
      });
      return promise;
    }
  });
