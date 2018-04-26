const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const item = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('POST', ()=> {
    it('creates and stores in the DB', async () => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      const createdItem = await Item.findOne(item);
      assert.isOk(createdItem, 'Item was not created in the DB');
    })
    it('redirects to the root', async() => {
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    })
    it('displays error if no title provided', async ()=> {
      const item = {
        description: 'test',
        imageUrl: 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      }
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
    it('displays error if no description provided', async ()=> {
      const item = {
        title: 'test',
        imageUrl: 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      }
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
    it('displays error if no imageUrl provided', async ()=> {
      const item = {
        title: 'test',
        description: 'test'
      }
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      const items = await Item.find({});
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
  })
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    });
  })
});
