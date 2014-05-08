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
  });
