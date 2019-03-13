# Get User Information

Return the details of an existing user if the user credentials are valid. An Authentication token is also sent with the user details.

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| /getUser      | [![POST](https://img.shields.io/badge/-POST-orange.svg)] | NO    |

#### Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |

#### Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------:|
| username      | string        | username of the user  |
| password      | string        | password of the user  |


```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/getUser',
  'headers': {
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

var postData =  {username: "johns", password: "pass"};

req.write(postData);

req.end();
```