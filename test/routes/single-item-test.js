const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', ()=> {
    it('returns correct image', async() => {
      const item = await seedItemToDatabase();
      const response = await request(app)
        .get(`/items/${item._id}`);
      assert.equal(response.status, 200);
      assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    })
  })

});
