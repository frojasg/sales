'use strict';

describe('Service: Userservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var UserService;
  var $httpBackend;
  var Facebook;
  var $rootScope;

  beforeEach(inject(function (_UserService_, _$httpBackend_, _Facebook_, _$rootScope_) {
    UserService = _UserService_;
    $httpBackend = _$httpBackend_;
    Facebook = _Facebook_;
    $rootScope = _$rootScope_;
  }));

  it('should do something', function () {
    expect(!!UserService).toBe(true);
  });

  describe('fetchUser', function() {
    beforeEach(function() {
      spyOn(Facebook, 'getLoginStatus');
    });

    it('We use facebook function', function() {
      var result = UserService.fetchUser();
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
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalledWith({status: 'connected', authResponse: {accessToken: '123'}});
      });

      it('the user gave not access to our app', function() {
        this.f({status: 'rejected'})
        this.result.then(function(){}, this.onComplete);
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalled();
      });
    });
  });
});
