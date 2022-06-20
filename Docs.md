# Before you Start.
- This project is just a learning project.
- Every Feature i add here is a practice or a new thing.

## How does it works?
- it uses Asymmetric Encryption (public keys, private keys) to make sending messages Private. so a user will have His public key in our servers and anyone can view this public key (if he knows the account address) and then if someone wants to message this user he will just encrypt the message with the pub key and send it to the user, and the user will decrypt it using his private key.
- What if user is not connected? The message will stay on our Temporary Databases (MongoDB) till he connects and the message will be sent to him. then Deleted when we make sure it's been Delivered

# Application Architecture:
## V1.1
![v1.1](https://user-images.githubusercontent.com/44875260/174115483-70ddce68-243f-48a8-8175-768b767cc7d7.png)
### Explanation:
- User Database: Internal PostgreSQL RDBMS.
- Messages Database: Cloud MongoDB (Atlas).
- Users MicroService: RESTful API MS to (Register, Login, Records, Updating data)
- Messages MicroService: WebSockets MS to (Send, Recieve) Messages
- Locad Balancer: HAproxy Locad balancer to balance the load between the MicroServices instances. 
### PostgreSQL Design
![db1.1](https://i.imgur.com/Ifp05tK.png)
### MongoDB Design
```JS
{_id:'123',
 to:'AbdoRayan',
 from:'terry404',
 message:'mkIDZeE1lW15ndSg34th2AGBS4JdzJYUQW/EwuYqQPo30gSUyIsfF+VOQHBELeMfHhX0HDHKt/+m0OV4KCeWO1GMhwZofDXHA6EXCpwcapMN0u53GsTy5RbajpAAYXrxsGaBB8WFuYn0jKQGxC8Kf8dF+JiqGa0g2ZLDi0t4Kws=',
 sent_at:'2022-06-06'
}
```
### Some Technical choices explained.
**input Checks** in terms to check the input for any SQL injection i had an idea to make it quick and easy to implement. my idea was to prevent any Misc characters except Alphabet and numbers and space, so even if a user just started Writing "SELECT FROM ..." nothing will happen because those statments he will inject it will stay inside the quotes where the postgreSQL will not take it as SQL statemnts. so my focus here was to prevent playing with the quotes because that will be the only way for an injection from my POV.