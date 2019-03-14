# Update an available item

Update the details of the availbale items in the system

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//updateItem--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| _id           | string        | ID of the item  |
| itemName      | string        | new item name  |
| price         | number        | new price for the items  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/updateItem',
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
  _id: "2376gdsaiudqwiodq",
  itemName: "itemX",
  price: 1.2
});

req.write(postData);

req.end();
```

## Example Response
```
{
    itemId: "sakjd67khjUYGkjsakdlk",
    message: "Item itemX successfully updated"
}
```

