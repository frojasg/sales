'use strict';

describe('Service: Itemservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var Itemservice;
  beforeEach(inject(function (_Itemservice_) {
    Itemservice = _Itemservice_;
  }));

  it('should do something', function () {
    expect(!!Itemservice).toBe(true);
  });

});
