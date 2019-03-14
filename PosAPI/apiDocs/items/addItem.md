# Add new item

Add a new item to the available items

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//addItem--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| itemname      | string        | name of the item  |
| price         | number        | price for the item  |
| file          | file          | image displaying the item  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/addItem',
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

var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"itemName\"\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"price\"\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{Insert_File_Name}\"\r\nContent-Type: \"{Insert_File_Content_Type}\"\r\n\r\n{Insert_File_Content}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

req.write(postData);

req.end();
```

## Example Response
```
{
    itemId: "sakjd67khjUYGkjsakdlk",
    message: "Item itemX successfully added"
}
```

