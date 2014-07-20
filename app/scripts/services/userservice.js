'use strict';

angular.module('salesApp')
  .service('UserService', function UserService($http, $q, localStorageService, $rootScope, Facebook) {
    var self = this;
    this.accessToken = null;
    this.user = localStorageService.get('user');

    this.getUser = function() { return this.user; };

    this.isLogged = function () { return !(typeof this.user === 'undefined' || this.user === null);};

    $rootScope.$on('Facebook:statusChange', function(ev, data) {
      if (data.status === 'connected') {
        self.me().then(function(user){
          self.upsertUser(user);
          self.user = user;
          $rootScope.$broadcast('user.logged', self.user);
        });
      } else {
        self.clean();
      }
    });

    this.facebook = function(authMethod) {
      var deferred = $q.defer();
      Facebook[authMethod](function(response) {
        if (response.status === 'connected') {
          self.accessToken = response.authResponse.accessToken;
          return deferred.resolve(response);
        } else {
          return deferred.reject();
        }
      });
      return deferred.promise;
    };

    this.fetchUser = function() {
      return self.facebook('getLoginStatus');
    };

    this.authorization = function() {
      return self.facebook('login');
    };

    this.login = function() {
      return self.fetchUser().then(function() { }, self.authorization).then(function() {
        self.upsertUser();
        return self.me().then(function(user) {
          self.user = user;
          localStorageService.set('user', user);
          localStorageService.set('logged', typeof user !== 'undefined');
          $rootScope.$broadcast('user.logged', self.user);
          return user;
        });
      }, function() {
        $rootScope.$broadcast('user.not_authorized');
        return $q.reject('not_authorized');
      });
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
    };

    this.upsertUser = function() {
      var data = {'access_token': this.accessToken};
      var promise = $http.post('/users', data).then(function(response) {
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
