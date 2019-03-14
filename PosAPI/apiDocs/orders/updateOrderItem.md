# Update an item in the order

update the item count of the item of an order

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//updateOrderItem--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | username of the user that the order belong |
| orderId       | string        | ID of the order that the item should be updated  |
| itemName      | string        | name of the item to be updated  |
| count         | number        | new item count of the added item  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/updateOrderItem',
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
  orderId: "3wokfhydnslyrd5jdd",
  itemName: "itemX",
  count: 3
});

req.write(postData);

req.end();
```

## Example Response
```
{
  itemName: "itemX",
  price: 1.7,
  count: 3
}
```

