const {buildItemObject, userCreatesItem} = require('../test-utils');
const Item = require('../../models/item');
const {assert} = require('chai');

describe('Update', () => {
  describe('new image properties are displayed', () => {
    it('updates an item', () => {
      const item = buildItemObject();
      browser.url('/items/create');

      userCreatesItem(item);
      // click single-view button
      browser.click('.item-card a');
      // click update button
      browser.click('.update-button]')
      // give new data
      const updatedItem = {
        title: 'test-title',
        description: 'test-description',
        imageUrl: 'test-url'
      };
      userCreatesItem(updatedItem)
      // assert that item was updated
      assert.include(browser.getText('#item-title'), updatedItem.title);
      assert.include(browser.getAttribute('body img', 'src'), updatedItem.imageUrl);
    });
  });
});
