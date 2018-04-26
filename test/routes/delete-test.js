const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', ()=> {
    it('deletes image from DB', async() => {
      const item = await seedItemToDatabase();
      const response = await request(app)
        .post(`/items/${item._id}/delete`)
        .type('form')

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    })
  })

});
