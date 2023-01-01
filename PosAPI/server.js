const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
require('./api/models/posModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// importing and registering routes
const routes = require('./api/routes/posRoutes');

routes(app);

if (!module.parent) {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/posDB', { useNewUrlParser: true });
  app.listen(port);
}

console.log(`POS RESTful API server started on: ${port}`);

module.exports = app;
