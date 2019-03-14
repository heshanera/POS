# Delete a user

Removing a user registered in the system

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![DELETE](https://img.shields.io/badge//deleteUser--black.svg)]() | [![DELETE](https://img.shields.io/badge/DELETE-red.svg)]() | [![DELETE](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | username of the user  |
| password      | string        | password of the user  |



## Example Request
```
var http = require('http');

var options = {
  'method': 'DELETE',
  'hostname': 'localhost',
  'path': '/deleteUser',
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

var postData = JSON.stringify({
  username: "johns",
  password: "pass"
});

req.setHeader('Content-Length', postData.length);

req.write(postData);

req.end();
```

## Example Response
```
{
    deletedCount: 1
}
```

