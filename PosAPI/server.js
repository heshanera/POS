let express = require('express');
let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let port = process.env.PORT || 3001;
let mongoose = require('mongoose');
let posModel = require('./api/models/posModel');
let bodyParser = require('body-parser');
let cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// importing and registering routes
let routes = require('./api/routes/posRoutes');
routes(app);

if(!module.parent) {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/posDB', { useNewUrlParser: true });	
 	app.listen(port);
}

console.log('POS RESTful API server started on: ' + port);

module.exports = app
