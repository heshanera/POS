# PosAPI

Server developed using Nodejs, Express and Mongodb.

## Installation

```
$ npm install
```

## Database
[install mongodb](https://docs.mongodb.com/manual/installation/)


start the database 

``` 
$ mongod 
```

## Starting the server
```
$ npm start
```


## API Endpoints

## User

[![POST](https://img.shields.io/badge/Login-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#04f5efe4-4724-4dac-b654-d00e87c15423) 
[![POST](https://img.shields.io/badge//getUser--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#04f5efe4-4724-4dac-b654-d00e87c15423)

[![POST](https://img.shields.io/badge/Add%20new%20user-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#1674aa8b-5316-4dc5-a34e-ee66a51f85ba)
[![POST](https://img.shields.io/badge//addUser--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#1674aa8b-5316-4dc5-a34e-ee66a51f85ba)

[![POST](https://img.shields.io/badge/List%20users-GET-brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#fb3891e4-d911-42fa-adea-9606e0dd40ad)
[![POST](https://img.shields.io/badge//listUsers--brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#fb3891e4-d911-42fa-adea-9606e0dd40ad)

[![POST](https://img.shields.io/badge/Delete%20user-DELETE-red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#dc388992-b216-4ff6-b14a-3e9513bb2303)
[![POST](https://img.shields.io/badge//deleteUser--red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#dc388992-b216-4ff6-b14a-3e9513bb2303)

## Orders
[![POST](https://img.shields.io/badge/Create%20an%20order%20list%20for%20an%20existing%20user-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#45499a59-aab1-4310-90b2-197c73609301) 
[![POST](https://img.shields.io/badge//createOrder--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#45499a59-aab1-4310-90b2-197c73609301)

[![POST](https://img.shields.io/badge/Delete%20all%20the%20orders%20of%20an%20existing%20user-DELETE-red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#00e78001-5780-433c-9c83-6741db44699e) 
[![POST](https://img.shields.io/badge//removeOrderList--red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#00e78001-5780-433c-9c83-6741db44699e)

[![POST](https://img.shields.io/badge/Get%20all%20orders%20of%20all%20the%20existing%20users-GET-brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#d847f48e-2f56-44fb-b5af-5b8d50088fe1) 
[![POST](https://img.shields.io/badge//listOrders--brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#d847f48e-2f56-44fb-b5af-5b8d50088fe1)

[![POST](https://img.shields.io/badge/Add%20a%20new%20order%20for%20user-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5c1b0890-e5e4-4c10-8977-7c3b9cb57d3f) 
[![POST](https://img.shields.io/badge//addOrder--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5c1b0890-e5e4-4c10-8977-7c3b9cb57d3f)

[![POST](https://img.shields.io/badge/Remove%20an%20order%20from%20the%20order%20list%20of%20a%20user-DELETE-red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5a5f5159-7991-49e8-b077-093a9bfafea1) 
[![POST](https://img.shields.io/badge//removeOrder--red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5a5f5159-7991-49e8-b077-093a9bfafea1)

[![POST](https://img.shields.io/badge/Add%20a%20new%20item%20to%20an%20existing%20order-POST-orange.svg?style=flat-square)]() 
[![POST](https://img.shields.io/badge//addOrderItem--orange.svg?style=flat-square)]()

[![POST](https://img.shields.io/badge/Update%20the%20item%20count%20of%20an%20item%20that%20is%20added%20to%20an%20order-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#df762567-2316-4ccf-a630-fe1f93b0628a) 
[![POST](https://img.shields.io/badge//updateOrderItem--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#df762567-2316-4ccf-a630-fe1f93b0628a)

[![POST](https://img.shields.io/badge/remove%20an%20item%20from%20an%20order-DELETE-red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#c4115ddf-12e0-4616-aa8e-aad126ac3b0f) 
[![POST](https://img.shields.io/badge//removeOrderItem--red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#c4115ddf-12e0-4616-aa8e-aad126ac3b0f)

[![POST](https://img.shields.io/badge/get%20the%20oder%20list%20of%20the%20given%20user-GET-brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#68e58b03-75ab-46b2-8300-238a8b73bde7) 
[![POST](https://img.shields.io/badge//getOrders:username--brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#68e58b03-75ab-46b2-8300-238a8b73bde7)

## Items

[![POST](https://img.shields.io/badge/Get%20all%20available%20items-GET-brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5cafa922-faca-4bce-875a-4621e4e420aa) 
[![POST](https://img.shields.io/badge//getItems--brightgreen.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#5cafa922-faca-4bce-875a-4621e4e420aa)

[![POST](https://img.shields.io/badge/Adding%20a%20new%20item%20for%20available%20items-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#fee6a717-ea53-41fd-97ae-273fa1c9af85) 
[![POST](https://img.shields.io/badge//addItem--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#fee6a717-ea53-41fd-97ae-273fa1c9af85)

[![POST](https://img.shields.io/badge/Update%20an%20available%20item-POST-orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#a22ee374-002f-418d-bd58-e28911fe60e7) 
[![POST](https://img.shields.io/badge//updateItem--orange.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#a22ee374-002f-418d-bd58-e28911fe60e7)

[![POST](https://img.shields.io/badge/Delete%20an%20available%20item-DELETE-red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#4507fc3a-2e0e-4545-ab3d-d8d35b5d6921) 
[![POST](https://img.shields.io/badge//deleteItem--red.svg?style=flat-square)](https://documenter.getpostman.com/view/6896211/S11RKvXZ#4507fc3a-2e0e-4545-ab3d-d8d35b5d6921)
