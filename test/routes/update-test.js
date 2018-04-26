const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId/update', () => {
  let item;
  let updatedItem;
  // set values of repeating variables
  beforeEach(async() => {
    await connectDatabaseAndDropData()
    item = await seedItemToDatabase();
    updatedItem = {
      title: 'test-title',
      description: 'test-description',
      imageUrl: 'test-url'
    };
  });

  afterEach(diconnectDatabase);
  describe('GET', ()=> {
    it('opens update page with the form filled with data from DB', async() => {
      const response = await request(app)
        .get(`/items/${item._id}/update`)

      assert.equal(response.status, 200);
      assert.include(response.text, item.title);
      assert.include(response.text, item.description);
      assert.include(response.text, item.imageUrl);

    });
  });
  describe('POST', ()=> {
    it('updates and stores in the DB', async () => {
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(updatedItem);

      const updatedItemDb = await Item.findOne(updatedItem);
      const result = (({ title, description, imageUrl }) => ({ title, description, imageUrl }))(updatedItemDb);
      assert.deepEqual(result, updatedItem, 'Item was not updated in the DB');
    })
    it('redirects to the root', async() => {

      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(updatedItem);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    })
    it('displays error if no title provided', async ()=> {
      updatedItem.title = '';

      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(updatedItem);

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
    it('displays error if no description provided', async ()=> {
      updatedItem.description = '';
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(updatedItem);

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
    it('displays error if no imageUrl provided', async ()=> {
      updatedItem.imageUrl = '';
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(updatedItem);

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
  })
});
