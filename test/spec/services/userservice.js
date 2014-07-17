'use strict';

describe('Service: Userservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var UserService;
  beforeEach(inject(function (_UserService_) {
    UserService = _UserService_;
  }));

  it('should do something', function () {
    expect(!!UserService).toBe(true);
  });

});
