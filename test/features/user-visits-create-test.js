const {assert} = require('chai');
const {buildItemObject, userCreatesItem} = require('../test-utils');

describe('user visits create page', ()=> {
  describe('user posts item', () => {
    it('renders items', () => {
      const item = buildItemObject();
      browser.url('/items/create');
      
      userCreatesItem(item);

      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);

    })
  })
})
