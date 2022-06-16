# Before you Start.
- This project is just a learning project.
- Every Feature i add here is a practice or a new thing.

## How does it works?
- it uses Asymmetric Encryption (public keys, private keys) to make sending messages Private. so a user will have His public key in our servers and anyone can view this public key (if he knows the account address) and then if someone wants to message this user he will just encrypt the message with the pub key and send it to the user, and the user will decrypt it using his private key.
- What if user is not connected? The message will stay on our Temporary Databases (MongoDB) till he connects and the message will be sent to him. then Deleted when we make sure it's been Delivered

# Application Architecture:
## V1.0
![v1.0](https://i.imgur.com/UOGj0ic.png)
## V1.0 Database Design
![db1.0](https://i.imgur.com/pLai1X4.png)
## V1.0 Explanation:
- Database: Not exposed to the public, only take Requests from internal network, Probably PostgreSQL.
- Kubernetes: RESTful API MicroServices for Data transfer, (Login, Register, get Users Public Keys record, Send message, Update public key record) acts like a backend but a very stateless backend.
- Reverse Proxy: to seperate the Request to the backend or frontend. Probably HAproxy.
- Load Balancer: to load balance between the MicroServices, Default Round Robin. Probably HAproxy.
- note: Reverse Proxy & Load balancer is in the same instance (HAproxy), not seperate instances.

## V1.1
![v1.1](https://user-images.githubusercontent.com/44875260/174115483-70ddce68-243f-48a8-8175-768b767cc7d7.png)
## V1.1 Explanation:
- User Database: Internal PostgreSQL RDBMS.
- Messages Database: Cloud MongoDB (Atlas).
- Users MicroService: RESTful API MS to (Register, Login, Records, Updating data)
- Messages MicroService: WebSockets MS to (Send, Recieve) Messages
- Locad Balancer: HAproxy Locad balancer to balance the load between the MicroServices instances. 
## V1.1 PostgreSQL Design
![db1.1](https://i.imgur.com/Ifp05tK.png)
## V1.1 MongoDB Design
```JS
{_id:'123',
 to:'AbdoRayan',
 from:'terry404',
 message:'mkIDZeE1lW15ndSg34th2AGBS4JdzJYUQW/EwuYqQPo30gSUyIsfF+VOQHBELeMfHhX0HDHKt/+m0OV4KCeWO1GMhwZofDXHA6EXCpwcapMN0u53GsTy5RbajpAAYXrxsGaBB8WFuYn0jKQGxC8Kf8dF+JiqGa0g2ZLDi0t4Kws=',
 sent_at:'2022-06-06'
}
```
