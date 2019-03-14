# Add an Order

Add new order to the list of the orders of the given user

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//addOrder--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | username of the user that the order belong |
| items         | array         | array contains list of items. each item contain name, price anth the count  |
| status        | string        | status of the order  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/addOrder',
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
  items: [
    {
      itemName: "itemX",
      price: 2.4,
      count: 1
    },
    {
      itemName: "itemY",
      price: 1.7,
      count: 1
    }
  ],
  status: "pending"
});

req.write(postData);

req.end();
```

## Example Response
return the new size of the order list
```
{
  3 
}
```

