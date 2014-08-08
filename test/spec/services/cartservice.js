'use strict';

describe('Service: Cartservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var CartService;
  var $httpBackend;
  var UserService;
  var $rootScope;

  beforeEach(inject(function ($injector) {
    CartService = $injector.get('CartService');
    $httpBackend = $injector.get('$httpBackend');
    UserService = $injector.get('UserService');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('checkout process', function() {
    beforeEach(function() {
      this.onComplete = jasmine.createSpy('onComplete');
    });
    describe('when there is not a item in the cart', function() {
      it('return a failed promise saying the cart is empty', function() {
        CartService.checkout().then(function() {}, this.onComplete);
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalled();
      });
    });
    describe('when there is not an item in the cart', function() {
      beforeEach(function() {
        spyOn(UserService, 'getUser').andReturn({access_token: '1234'});
      });

      it('return a failed promise saying the cart is empty', function() {
        CartService.checkout().then(function() {}, this.onComplete);
        $rootScope.$digest();
        expect(this.onComplete).toHaveBeenCalled();
      });
    });
    describe('when there is a item in the cart', function() {
      beforeEach(function() {
        expect(!!$httpBackend).toBe(true);
        var item = {uuid: '123'};
        CartService.add(item);
      });

      describe('when the user is not logged in', function() {
        it('return a failed promise saying the user is not logged in', function() {
          CartService.checkout().then(function() {}, this.onComplete);
          $rootScope.$digest();
          expect(this.onComplete).toHaveBeenCalled();
        });
      });
      describe('when the user is logged in', function() {
        beforeEach(function() {
          spyOn(UserService, 'getUser').andReturn({access_token: '1234'});
        });
        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        });

        it('POST item to backend service', function() {
          var order = {uuid: '4321'};
          $httpBackend.expectPOST('/items/123/order', {access_token: '1234'}).respond(order);
          CartService.checkout().then(this.onComplete);
          $rootScope.$digest();
          $httpBackend.flush();
          expect(this.onComplete).toHaveBeenCalledWith(order);
        });

      });
    });
  });

  it('add item to Cart', function () {
    var item = {uuid: '123'};
    CartService.add(item);
    expect(CartService.count()).toBe(1);
  });

  it('clean the Cart', function() {
    var item = {uuid: '123'};
    CartService.add(item);
    CartService.clean();
    expect(CartService.count()).toBe(0);
  });
});
