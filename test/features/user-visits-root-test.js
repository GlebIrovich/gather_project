const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });
  describe('navigate to create.html', () => {
    it('starts blank', () => {
      browser.url('/');

      browser.click('a[href="/items/create"]');

      assert.include(browser.getText('body'), 'Create');
    });
  });
});
