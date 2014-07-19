'use strict';

describe('Service: Userservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var UserService;
  var $httpBackend;
  var Facebook;
  var $rootScope;

  beforeEach(inject(function (_UserService_, _Facebook_, _$rootScope_) {
    UserService = _UserService_;
    Facebook = _Facebook_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('should do something', function () {
    expect(!!UserService).toBe(true);
  });

  describe('upsertUser', function() {
    beforeEach(function() {
      UserService.accessToken = '1234';
    });

    it('send access token to the server', function() {
      expect(!!$httpBackend).toBe(true);
      $httpBackend.expectPOST('/users', {'access_token': '1234'}).respond(201, {user: {id: '123'}});
      UserService.upsertUser();
      $httpBackend.flush();
    });
  });

  describe('fetchUser', function() {
    beforeEach(function() {
      spyOn(Facebook, 'getLoginStatus');
    });

    it('We use facebook function', function() {
      UserService.fetchUser();
      expect(Facebook.getLoginStatus).toHaveBeenCalled();
      expect(Facebook.getLoginStatus.calls.length).toEqual(1);
    });

    describe('when callback is used', function() {
      beforeEach(function() {
        this.result = UserService.fetchUser();
        this.f = Facebook.getLoginStatus.mostRecentCall.args[0];
        this.onComplete = jasmine.createSpy('onComplete');
      });

      it('the user gave access to our app', function() {
        this.f({status: 'connected', authResponse: {accessToken: '123'}});
        this.result.then(this.onComplete);
        expect(UserService.accessToken).toEqual('123');
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalledWith({status: 'connected', authResponse: {accessToken: '123'}});
      });

      it('the user gave not access to our app', function() {
        this.f({status: 'rejected'});
        this.result.then(function(){}, this.onComplete);
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalled();
      });
    });
  });

  describe('authorization', function() {
    beforeEach(function() {
      spyOn(Facebook, 'login');
    });

    it('We use facebook function', function() {
      UserService.authorization();
      expect(Facebook.login).toHaveBeenCalled();
      expect(Facebook.login.calls.length).toEqual(1);
    });

    describe('when callback is used', function() {
      beforeEach(function() {
        this.result = UserService.authorization();
        this.f = Facebook.login.mostRecentCall.args[0];
        this.onComplete = jasmine.createSpy('onComplete');
      });

      it('the user gave access to our app', function() {
        this.f({status: 'connected', authResponse: {accessToken: '123'}});
        this.result.then(this.onComplete);
        expect(UserService.accessToken).toEqual('123');
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalledWith({status: 'connected', authResponse: {accessToken: '123'}});
      });

      it('the user gave not access to our app', function() {
        this.f({status: 'rejected'});
        this.result.then(function(){}, this.onComplete);
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalled();
      });
    });
  });
});
