# Usage.
You will need "REST Client" [extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VSCode in order to test the RESTful API with just a click.<br/>
but in terms of the messaging MS you might need to test it manually,<br/>
one Tool i use to connect to a WS server is [websocat](https://github.com/vi/websocat), you might want to use it in order to test the messaging service

## REST API. endpoints
| endpoint | method | takes | returns |
| -------- | :---: | ----- | ----- |
|`/api/register`|**POST**| username, password, public_key | address, username, public_key |
|`/api/login`|**POST**| address, password | address, username, public_key |
|`/api/update`|**PUT**| address, password, public_key | address, public_key |
|`/api/record/:address`|**GET**| address as param | public_key |

![rest client](https://humao.gallerycdn.vsassets.io/extensions/humao/rest-client/0.24.6/1638197435436/Microsoft.VisualStudio.Services.Icons.Default)

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

## WebSocketServer Requests & Responses
### sent by User
| type | use case | takes | returns |
| :--------: | ----- | ----- |  ----- |
| `login` | for logging in when the handshake is made | {address:String, password:String} | {status:String, reason(in case of failure}:String |
| `send` | for sending messages | {address:String, message:String} | {status:String, reason(in case of failure):String |

### sent by Server
| type | use case | body |
| :--------: | ----- | ----- |
| `connection` | for any types of connection changes | {status:String, reason:String}|
| `message` | for real-time message recieving | {from:String, message:String} |
| `pending-message` | for message that's been pending on our Databases | {from:String, message:String, sent_at:Date}
