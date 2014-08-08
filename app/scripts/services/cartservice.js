'use strict';

angular.module('salesApp')
  .service('CartService', function CartService($http, $q, UserService) {

    this.items = [];

    this.add = function(item) {
      this.items.push(item);
    };

    this.count = function() {
      return this.items.length;
    };

    this.clean = function() {
      this.items = [];
    };

    this.empty = function() {
      return this.items.length == 0;
    };

    this.getFirstItemUuid = function() {
      return this.items[0].uuid;
    };

    this.checkout = function() {
      var user = UserService.getUser();
      if(user == null) {
        return $q.reject('user has to be logged in');
      }
      if (this.empty()) {
        return $q.reject('the cart is empty');
      }
      var data = { access_token: user.access_token };
      var promise = $http.post("/items/"+ this.getFirstItemUuid() + "/order", data).then(function(response) {
        return response.data;
      });
      return promise;
    };
});
