# Usage.
You will need "REST Client" extension in VSCode in order to test the RESTful API with just a click.<br/>
but in terms of the messaging MS you might need to test it manually,<br/>
one Tool i use to connect to a WS server is [websocat](https://github.com/vi/websocat), you might want to use it in order to test the messaging service

## REST API. endpoints
| endpoint | method | takes | returns |
| -------- | :---: | ----- | ----- |
|`/api/register`|**POST**| username, password, public_key | address, username, public_key |
|`/api/login`|**POST**| address, password | address, username, public_key |
|`/api/update`|**PUT**| address, password, public_key | address, public_key |
|`/api/record/:address`|**GET**| address as param | public_key |

## register
```http
POST http://localhost:3000/api/register HTTP/1.1
content-type: application/json

{
    "username": "AbdoRayan",
    "password": "qwertyyy",
    "public_key": "dont have one right now."
}
```
## login
```http
POST http://localhost:3000/api/login HTTP/1.1
content-type: application/json

{
    "address": "0x24f1",
    "password": "qwertyyyy"
}
```
## update
```http
PUT http://localhost:3000/api/update HTTP/1.1
content-type: application/json

{
    "address": "0x24f1",
    "password": "qwertyyy",
    "public_key": "another weird string because i dont have pub key right now"
}
```
## record
```http
GET http://localhost:3000/api/record/0x24f1 HTTP/1.1
```
