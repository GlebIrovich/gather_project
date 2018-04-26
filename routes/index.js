const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', (req, res, next) => {
  res.render('create');
})

router.post('/items/create', async(req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const item = new Item({title, description, imageUrl});
  item.validateSync();
  if (item.errors) {
    res.status(400).render('create', {newItem: item});
  } else {
    await item.save();
    res.redirect('/');
  }
})

router.get('/items/:itemId', async(req, res, next) => {
  const item = await Item.findOne({_id: req.params.itemId});
  res.status(200).render('single-view', {item: item})
})

router.post('/items/:itemId/delete', async(req, res, next) => {
  await Item.findByIdAndRemove(req.params.itemId);
  res.redirect('/');
})

router.get('/items/:itemId/update', async(req, res, next) => {
  const item = await Item.findOne({_id: req.params.itemId});
  res.render('update', {item: item});
})

router.post('/items/:itemId/update', async(req, res, next) => {
  const {title, description, imageUrl} = req.body;
  // validate
  const item = new Item({title, description, imageUrl})
  item.validateSync();

  if (item.errors) {
    // set id of original image
    item._id = req.params.itemId;
    res.status(400).render('update', {item});
  } else {
    await Item.findByIdAndUpdate(req.params.itemId, {title, description, imageUrl});
    res.redirect('/');
  }
})


module.exports = router;
