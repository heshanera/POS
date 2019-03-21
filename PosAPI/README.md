# POS API

[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()

Server developed using Nodejs, Express and Mongodb.

## Install

```
$ npm install
```

## Start Mongodb

``` 
$ mongod 
```

## Start the server

```
$ npm start
```

# API Endpoints

## User

| <b>Login</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/getUser.md)           | [/getUser](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/getUser.md)  |
| ------------- |:-------------:| -----:|

| <b>Add new user</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/addUser.md)          | [/addUser](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/addUser.md) |
| ------------- |:-------------:| -----:|

| <b>List users</b>        | [![GET](https://img.shields.io/badge/-GET-brightgreen.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/listUsers.md)          | [/listUsers](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/listUsers.md)  |
| ------------- |:-------------:| -----:|

| <b>Delete user</b>        | [![DELETE](https://img.shields.io/badge/-DELETE-red.svg?style=flat-square)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/deleteUser.md)          | [/deleteUser](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/user/deleteUser.md) |
| ------------- |:-------------:| -----:|


## Orders

| <b>Create an order list</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/createOrder.md)           | [/createOrder](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/createOrder.md)  |
| ------------- |:-------------:| -----:|

| <b>Delete order list</b>        | [![DELETE](https://img.shields.io/badge/-DELETE-red.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrderList.md)          | [/removeOrderList](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrderList.md)  |
| ------------- |:-------------:| -----:|

| <b>Get all orders</b>        | [![GET](https://img.shields.io/badge/-GET-brightgreen.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/listOrders.md)           | [/listOrders](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/listOrders.md)   |
| ------------- |:-------------:| -----:|


| <b>Add a new order for user</b> | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/addOrder.md)            | [/addOrder](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/addOrder.md)    |
| ------------- |:-------------:| -----:|

| <b>Remove an order</b>        | [![DELETE](https://img.shields.io/badge/-DELETE-red.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrder.md)          | [/RemoveOrder](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrder.md)  |
| ------------- |:-------------:| -----:|

| <b>Add new item to order</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/addOrderItem.md)          | [/addOrderItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/addOrderItem.md)  |
| ------------- |:-------------:| -----:|

| <b>Update the item count</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/updateOrderItem.md)          | [/updateOrderItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/updateOrderItem.md)  |
| ------------- |:-------------:| -----:|

| <b>Remove an item from an order</b>        | [![DELETE](https://img.shields.io/badge/-DELETE-red.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrderItem.md)          | [/removeOrderItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/removeOrderItem.md)  |
| ------------- |:-------------:| -----:|

| <b>Get orders of all users</b>        | [![GET](https://img.shields.io/badge/-GET-brightgreen.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/getOrders.md)          | [/getOrders](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/orders/getOrders.md)  |
| ------------- |:-------------:| -----:|

## Items

| <b>Get all available items</b>        | [![GET](https://img.shields.io/badge/-GET-brightgreen.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/getItems.md)           | [/getItems](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/getItems.md)   |
| ------------- |:-------------:| -----:|

| <b>Adding a new item</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/addItem.md)           | [/addItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/addItem.md)   |
| ------------- |:-------------:| -----:|

| <b>Update an available item</b>        | [![POST](https://img.shields.io/badge/-POST-orange.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/updateItem.md)           | [/updateItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/updateItem.md)   |
| ------------- |:-------------:| -----:|

| <b>Delete an available item</b>        | [![DELETE](https://img.shields.io/badge/-DELETE-red.svg)](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/deleteItem.md)           | [/deleteItem](https://github.com/heshanera/POS/blob/master/PosAPI/apiDocs/items/deleteItem.md)   |
| ------------- |:-------------:| -----:|

