# Add new user

Adding a new user to the system

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//addUser--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/YES-brightgreen.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |
| Authorization | JWT Authentication token |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------:|
| username      | string        | username of the user  |
| password      | string        | password of the user  |
| firstName     | string        | first name of the user  |
| lastName      | string        | last name of the user  |



## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/addUser',
  'headers': {
    'Authorization': 'tokenkjasdhaksdasdhasdhweidewfkweflsqwretryr',
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

var postData =  "{\n\t\"username\": \"johns\", \n\t\"password\": \"pass\",\n\t\"firstName\": \"john\",\n\t\"lastName\": \"Smith\"\n}";

req.write(postData);

req.end();
```

## Example Response
```
{
    firstName: "John",
    lastName: "Smith",
    username: "johns",
    _id: "sakjd67khjUYGkjsakdlk"
}
```

