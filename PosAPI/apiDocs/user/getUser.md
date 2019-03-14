# Get User Information

Return the details of an existing user if the user credentials are valid. An Authentication token is also sent with the user details.

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//getUser--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/NO-red.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | username of the user  |
| password      | string        | password of the user  |


## Example Request
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

var postData = JSON.stringify({
  username: "johns", 
  password: "pass"
});

req.write(postData);

req.end();
```

## Example Response
```
{
    firstName: "John",
    lastName: "Smith",
    message: "Authentication successfull",
    success: true,
    token: "eyJhbGciOiJIUzI1pXVVyYSIsImlhdCI6MTU1MjQ4MTA1NCwiZXhwIjoxNOAIJrt9cI",
    username: "johns"
}
```

