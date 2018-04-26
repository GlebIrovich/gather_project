const {buildItemObject, userCreatesItem} = require('../test-utils');
const {assert} = require('chai');

describe('User deletes item', () => {
  describe('deleted item is not displayed', () => {
    it('is not displayed', () => {
      const item = buildItemObject();
      // hit the endpoint to create an item
      browser.url('/items/create');
      // fill out and submit the form
      userCreatesItem(item)
      // click delete button
      browser.submitForm('.delete-form');
      // assert that image is not displayed
      assert.notInclude(browser.getText('body'), item.title);
      assert.notInclude(browser.getAttribute('body img', 'src'), item.imageUrl);
    });
  });
});
