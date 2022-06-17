# May-I
May I? is a User-To-User Encrypted messaging App. where you can send Encrypted Messages safely.

# Map
- [Technical Explanation](https://github.com/Terry-404/May-I/blob/main/Technical.md)
- [Usage](https://github.com/Terry-404/May-I/blob/main/TRY.md)

# How to use
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
