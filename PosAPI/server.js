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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// app.use((req, res, next) => {

//   const auth = {login: 'heshanera', password: 'heshan'}; // change this
//   // parse login and password from headers
//   const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
//   const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');
//   if (!login || !password || login !== auth.login || password !== auth.password) {
//     res.set('WWW-Authenticate', 'Basic realm="401"') // change this
//     res.status(401).send('Authentication required.') // custom message
//     return
//   }
//   next()
// })

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/posDB', { useNewUrlParser: true });


// importing and registering routes
let routes = require('./api/routes/posRoutes');
routes(app);

app.listen(port);


console.log('POS RESTful API server started on: ' + port);
