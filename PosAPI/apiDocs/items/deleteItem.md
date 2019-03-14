# Delete an available item

Remove the details of the availbale items in the system

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![DELETE](https://img.shields.io/badge//deleteItem--black.svg)]() | [![DELETE](https://img.shields.io/badge/POST-red.svg)]() | [![DELETE](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| itemName      | string        | item name  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'DELETE',
  'hostname': 'localhost',
  'path': '/deleteItem',
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
  itemName: "itemX"
});

req.setHeader('Content-Length', postData.length);

req.write(postData);

req.end();
```

## Example Response
```
{
    message: "item successfully deleted"
}
```

