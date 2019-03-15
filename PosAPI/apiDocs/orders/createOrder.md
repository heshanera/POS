# Create new order list

Create a new orderlist for a user

| URL           | Method        | Auth  |
| :-----------: |:-------------:| :----:|
| [![POST](https://img.shields.io/badge//createOrder--black.svg)]() | [![POST](https://img.shields.io/badge/POST-orange.svg)]() | [![POST](https://img.shields.io/badge/NO-red.svg)]() |


## Header

| Name          | Value        |
| :-----------: |:-------------:|
| Content-Type | application/json |


## Body

| Parameter     | Type          | Description  |
| :-----------: |:-------------:| :-----------|
| username      | string        | Username of the user  |
| orderlist     | array         | Array contains a list of orders. Each order contain list of items and the current status of the order  |


## Example Request
```
var http = require('http');

var options = {
  'method': 'POST',
  'hostname': 'localhost',
  'path': '/createOrder',
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

var postData =  JSON.stringify({
  username: "johns",
  orderList: [
    {
      items:
        [
          {
            name: "itemX",
            price: 1.2,
            count: 2
          },
          {
            name: "itemY",
            price: 1.7,
            count: 1
          },
          {
            name: "itemZ",
            price: 3.2,
            count: 3
          }
        ],
        status: "pending"
    },
    {
      items:
        [
          {
            name: "itemY",
            price: 1.7,
            count: 4
          }
        ],
        status: "pending"
    }
  ]
});

req.write(postData);

req.end();
```

## Example Response
```
{
  username: "johns",
  orderList: [
    {
      items: [
        {
          name: "itemX",
          price: 1.2,
          count: 2
          _id: "5c7166a61dee2c23f58dce51"
        },
        {
          name: "itemY",
          price: 1.7,
          count: 1
          _id: "5c7166a61dee2c23f58dce2d"
        },
        {
          name: "itemZ",
          price: 3.2,
          count: 3
          _id: "5c7166a61dee2c23f58dce3d"
        }
      ],
      status: "pending"
      _id: "5c7166a61dee2c23f58dce4d"
    },
    {
      items: [
        {
          name: "itemY",
          price: 1.7,
          count: 4
          _id: "5c7166a61dee2c23f58dce6d"
        }
      ],
      status: "pending"
      _id: "5c7166a61dee2c23f58dce7d"
    }
  ]
  _id: "5c7166a61dee2c23f58dced"
}
```

