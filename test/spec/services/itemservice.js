'use strict';

describe('Service: Itemservice', function () {

  // load the service's module
  beforeEach(module('salesApp'));

  // instantiate service
  var ItemService;
  beforeEach(inject(function (_ItemService_) {
    ItemService = _ItemService_;
  }));

  it('should do something', function () {
    expect(!!ItemService).toBe(true);
  });

});
