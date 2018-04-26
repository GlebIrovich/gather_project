const {buildItemObject, userCreatesItem} = require('../test-utils');
const {assert} = require('chai');

describe('User visits single-item view', () => {
  describe('renders single-view when single-view button is pressed', () => {
    it('shows a right description', () => {
      const item = buildItemObject();
      browser.url('/items/create');
      
      userCreatesItem(item);
      // click single-view button
      browser.click('.item-card a');
      // assert that description is displayed
      assert.include(browser.getText('#item-description'), item.description);
    });
  });
});
