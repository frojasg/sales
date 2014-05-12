'use strict';

angular.module('salesApp')
  .service('UserService', function UserService($http, $q, localStorageService, $rootScope, Facebook) {
    var self = this;
    this.accessToken;
    this.user = localStorageService.get('user');

    this.getUser = function() { return this.user; };

    this.isLogged = function () { return !(typeof this.user === 'undefined' || this.user === null);};
    $rootScope.$on('Facebook:statusChange', function(ev, data) {
      if (data.status == 'connected') {
        self.me().then(function(user){
          self.upsertUser(user);
          self.user = user;
          $rootScope.$broadcast('user.logged', self.user);
        });
      } else {
        self.clean();
      }
    });

    this.fetchUser = function() {
      var deferred = $q.defer();
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          self.accessToken = response.authResponse.accessToken;
          deferred.resolve(response);
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    };

    this.login = function() {
      return self.fetchUser().then(function() {
        self.me().then(function(user){
          self.upsertUser(user);
          self.user = user;
          $rootScope.$broadcast('user.logged', self.user);
        });
      }, self.authorization);
    };

    this.logout = function() {
      this.user = null;
      localStorageService.remove('user');
      localStorageService.remove('logged');
      $rootScope.$broadcast('user.logout');
    };

    this.clean = function() {
      this.user = null;
      localStorageService.remove('user');
      localStorageService.remove('logged');
      $rootScope.$broadcast('user.clean');
    }

    this.authorization = function() {
      var deferred = $q.defer();
      Facebook.login(function(response) {
        if(response.status == 'connected') {
          deferred.resolve(response);
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    };

    this.updateAccessToken = function (userId, accessToken) {
      $http.put('users/'+userId, {access_token: accessToken});
    };

    this.upsertUser = function(user) {
      user.access_token = this.accessToken;
      localStorageService.set('user', user);
      localStorageService.set('logged', typeof user !== "undefined");
      var promise = $http.post('/users', user).then(function(response) {
        return response.data;
      });
      return promise;
    };

    this.me = function() {
      var deferred = $q.defer();
      Facebook.api('me?fields=picture.height(150),name,first_name,last_name,username,id', deferred.resolve);
      return deferred.promise;
    };

  });
