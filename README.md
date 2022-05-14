# May-I
May I? is a Messages application where you can send messages all over the globe without any noses in it.

# Application Architecture:
## V1.0
![v1.0](https://i.imgur.com/UOGj0ic.png)
## V1.0 Database Design
![db1.0](https://i.imgur.com/XG7f1ZE.png)
## V1.0 Explanation:
- #### Database: Not exposed to the public, only take Requests from internal network, Probably PostgreSQL.
- #### Kubernetes: RESTful API MicroServices for Data transfer, (Login, Register, get Users Public Keys record, Send message, Update public key record) acts like a backend but a very stateless backend.
- #### Reverse Proxy: to seperate the Request to the backend or frontend. Probably HAproxy.
- #### Load Balancer: to load balance between the MicroServices, Default Round Robin. Probably HAproxy.
- #### note: Reverse Proxy & Load balancer is in the same instance (HAproxy), not seperate instances.
- ### Database Design:
- #### User Table: username varchar(35) [PK, NN], UUID varchar(36) [NN], password varchar(32) [NN], public_key(145) [NN] around 145 max characters if RSA 512 bit (i didn't do the math yet)
- #### Public_key_record: username [FK, NN], public_key [FK, NN] and both are Composite key
- #### Public_key_logs: username [FK, NN], UUID [FK, NN], old_public_key varchar(145), new_public_key varchar(145) [NN], updated_at date [NN]
