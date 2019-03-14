# Remove an item in the order

remove an item from the order

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![DELETE](https://img.shields.io/badge//removeOrderItem--black.svg)]() | [![DELETE](https://img.shields.io/badge/POST-red.svg)]() | [![DELETE](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | username of the user that the order belong |
| orderId       | string        | ID of the order that should be updated  |
| itemId        | string        | ID of the item that the item should be removed  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'DELETE',
  'hostname': 'localhost',
  'path': '/removeOrderItem',
  'headers': {
    'Authorization': 'J1c2VybmFtZSI6Imhlc2hhbmVyYSIsImlhdCI6MTU1MjI4MzkyNiwiZXh',
    'Content-Type': 'application/json'
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

var postData =  JSON.stringify({
  username: "johns",
  orderId: "rwopldfhjdlsyrh3irydjd",
  itemId: "35rupkfmnvhcksyefgjlf6dk
});

req.setHeader('Content-Length', postData.length);

req.write(postData);

req.end();
```

## Example Response
return the new item count of the order
```
{
  2
}
```

