/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const ItemModel = mongoose.model('Items');
const multer = require('multer');

const uploadImage = multer({
  // dest: UPLOAD_PATH,
  limits: { fileSize: 1000000, files: 1 },
});

const addItem = function (req, res) {
  const newItem = new ItemModel(req.body);
  const itemImage = {
    contentType: req.file.mimetype,
    image: req.file.buffer,
  };
  newItem.image = itemImage;
  newItem
    .save()
    .then((item) => {
      res.json({
        itemId: item._id,
        message: `Item ${item.itemName} successfully added`,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateItem = function (req, res) {
  ItemModel.findOne({ _id: req.body._id })
    .then((item) => {
      item.itemName = req.body.itemName;
      item.price = req.body.price;
      item
        .save()
        .then((itemData) => {
          res.json({
            itemId: itemData._id,
            message: `Item ${itemData.itemName} successfully updated`,
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getItems = function (req, res) {
  ItemModel.find()
    .then((items) => {
      if (items.length > 0) res.json(items);
      else throw new Error('no items');
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

const deleteItem = function (req, res) {
  ItemModel.deleteOne({
    itemName: req.body.itemName,
  })
    .then((order) => {
      if (order.deletedCount === 1) res.json({ message: 'item successfully deleted' });
      else throw new Error('invalid item name');
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

module.exports = {
  addItem,
  updateItem,
  getItems,
  deleteItem,
  uploadImage,
};
