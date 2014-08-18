'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /conditionsView when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/conditionsView");
  });


  describe('conditionsView', function() {

    beforeEach(function() {
      browser.get('index.html#/conditionsView');
    });


    it('should render conditionsView when user navigates to /conditionsView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for conditionsView/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
