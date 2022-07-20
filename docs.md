# Before you Start.
- This project is just a learning project.
- Every Feature i add here is a practice or a new thing.

## How does it works?
- it uses Asymmetric Encryption (public keys, private keys) to make sending messages Private. so a user will have His public key in our servers and anyone can view this public key (if he knows the account address) and then if someone wants to message this user he will just encrypt the message with the pub key and send it to the user, and the user will decrypt it using his private key.
- What if user is not connected? The message will stay on our Temporary Databases (MongoDB) till he connects and the message will be sent to him. then Deleted when we make sure it's been Delivered

# Application Architecture:
![v1.1](https://user-images.githubusercontent.com/44875260/174115483-70ddce68-243f-48a8-8175-768b767cc7d7.png)

### How messages are retrieveable?
the essential idea is to make the payload of the message made out of two parts, first part is made using reciever public key, second part is made using the sender public key then we will capture the second part and store it in our database, we will not be able to read the second part where the user can just store it on our server *Safely*</br></br>

`whole message payload`:
```js
{
 address:"0x---",
 message:"----", //encrypted using the reciever public key
 restore_message:'----" //encrypted using the sender public key
}
```
right now our servers may take the "restore_message" and store it in our databases.</br></br>
Smart guy might say now, "this is only for outgoing message" which is correct.
now this will only store outgoing messages from a user, but what about incoming ones? it's as simple as it is.<br>
we will just have middleware that will check if user have storing messages enabled and capture the message and store it. (more technical explaination later, now it's theoretical)

### WebSocket Class
```js
extends WS.WebSocket{
 _verified: boolean,
 _ACCaddress: String,,
 _username: String,
 _store-message: boolean
 }
```
### PostgreSQL Schema
![postgresql](https://user-images.githubusercontent.com/44875260/179971748-58792e72-8dfe-4a25-b41d-849dbdd6e508.png)

### MongoDB Schema
**pending messages model**
```JS
{
 receiver: String,
 receiver_username: String,
 sender: String,
 sender_username: String,
 message: String,
 sent_at: Date
}
```
**stored messages model**
```JS
{
  sender: String,
  sender_username: String,
  receiver: String,
  receiver_username: String,
  outgoing: Boolean,
  message: String,
  sent_at: Date
}
```
### Some Technical choices explained.
**input Checks** in terms to check the input for any SQL injection i had an idea to make it quick and easy to implement. my idea was to prevent any Misc characters except Alphabet and numbers and space, so even if a user just started Writing "SELECT FROM ..." nothing will happen because those statments he will inject it will stay inside the quotes where the postgreSQL will not take it as SQL statemnts. so my focus here was to prevent playing with the quotes because that will be the only way for an injection from my POV.<br><br>
**Automated SQL injection tests** please note that these tests are not that reliable if you want 100% secure SQL, if you really want that i suggest you to do it manually and analyse the SQL written in the code, :D 

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
## update public_key
```http
PUT http://localhost:3000/api/update/pubkey HTTP/1.1
content-type: application/json
{
    "address": "0x24f1",
    "password": "qwertyyy",
    "public_key": "another weird string because i dont have pub key right now"
}
```
## update settings
```http
PUT http://localhost:3000/api/update/settings HTTP/1.1
content-type: application/json
{
    "address": "0x24f1",
    "password": "qwertyyy",
    "storeIt": true
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
