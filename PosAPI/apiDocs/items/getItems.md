# Get Availbale Items

Return the details of all the availbale items

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![GET](https://img.shields.io/badge//getItems--black.svg)]() | [![GET](https://img.shields.io/badge/GET-brightgreen.svg)]() | [![GET](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

Do not supply a request body with this method.


## Example Request
```
var http = require('http');

var options = {
  'method': 'GET',
  'hostname': 'localhost',
  'path': '/getItems',
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
[
  {
    image: {
      contentType: "image/png", 
      image: {
        data: []
        type: "Buffer"
      }
    },
    itemName: "Chocolate Cupcake",
    price: 4.75,
    _id: "5c7166a61dee2c23f58dce5d"
  }
]
```

