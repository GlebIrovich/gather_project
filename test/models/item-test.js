const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('#title', ()=> {
    it('is a String', async() => {
      const number = 13;
      const item = new Item({title: number});
      assert.strictEqual(item.title, number.toString());
    });
    it('is required', async() => {
      const item = new Item({title: ''});
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.')
    })
  });
  describe('#description', ()=> {
    it('is a String', async() => {
      const number = 13;
      const item = new Item({description: number});
      assert.strictEqual(item.description, number.toString());
    });
    it('is required', async() => {
      const item = new Item({description: ''});
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.')
    })
  });
  describe('#imageUrl', ()=> {
    it('is a String', async() => {
      const number = 13;
      const item = new Item({imageUrl: number});
      assert.strictEqual(item.imageUrl, number.toString());
    });
    it('is required', async() => {
      const item = new Item({imageUrl: ''});
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.')
    })
  });
});
