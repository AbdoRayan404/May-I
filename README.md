# May-I
May I? is a User-To-User Encrypted messaging App. where you can send Encrypted Messages safely.

# Live webistes
- [User Microservice](https://mayiuserms.herokuapp.com/) note: check [docs](https://github.com/Terry-404/May-I/blob/main/docs.md) to understand what to do
- [Messages Microservice](https://mayimessagesms.herokuapp.com/) check docs !

# Map
- [docs](https://github.com/Terry-404/May-I/blob/main/docs.md)

# How to use
## Running tests
for api endpoint tests
```bash
npx mocha api.js
```
for sql injection tests
```bash
npx mocha sql.js
```
## Microservices Dockerfile
Install
```bash
sudo docker build -t {image-name} {Dockerfile-destination}
```
Run. Note: for user-ms use 3000, for messages-ms use 4000. 
```bash
sudo docker run -dp {published-MS-PORT}:{internal-MS-PORT} {image-name}
```
-d flag is optional if you want to run it in the background

## PostgreSQL Docker
Install it from Cloud and Run it
```bash
sudo docker run --name postgres -e POSTGRES_PASSWORD={POSTGRES-PASSWORD} -e PGDATA=/var/lib/postgres/data -p 5432:5432 -v pgdata:/var/lib/postgres/data postgres
```
## Note:
please keep in mind that 3000 & 4000 & 5432 are specific ports. these ports will be used along with HAProxy to Load balance.

# Want to Contribute?
if you want to contribute with me as a Front-end Dev, Message me in discord.
My Discord **Nameless#8663**. There's no Specific requirements :D
