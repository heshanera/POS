# Get list of Orders

Return the list of orders of the given user

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![GET](https://img.shields.io/badge//getOrders:username--black.svg)]() | [![GET](https://img.shields.io/badge/GET-brightgreen.svg)]() | [![GET](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Authorization | JWT Authentication token |


## Body

Do not supply a request body with this method.


## Example Request
```
var http = require('http');

var options = {
  'method': 'GET',
  'hostname': 'localhost',
  'path': '/getOrders/username',
  'headers': {
    'Authorization': 'J1c2VybmFtZSI6Imhlc2hhbmVyYSIsImlhdCI6MTU1MjI4MzkyNiwiZXh'
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
```

## Example Response
```
{
  username: "johns",
  orderList: [
    {
      items: [
        {
          name: "itemX",
          price: 1.2,
          count: 2
          _id: "5c7166a61dee2c23f58dce51"
        },
        {
          name: "itemY",
          price: 1.7,
          count: 1
          _id: "5c7166a61dee2c23f58dce2d"
        },
        {
          name: "itemZ",
          price: 3.2,
          count: 3
          _id: "5c7166a61dee2c23f58dce3d"
        }
      ],
      status: "pending"
      _id: "5c7166a61dee2c23f58dce4d"
    },
    {
      items: [
        {
          name: "itemY",
          price: 1.7,
          count: 4
          _id: "5c7166a61dee2c23f58dce6d"
        }
      ],
      status: "pending"
      _id: "5c7166a61dee2c23f58dce7d"
    }
  ]
  _id: "5c7166a61dee2c23f58dced"
}
```

