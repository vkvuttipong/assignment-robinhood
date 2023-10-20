## Getting started

to install docker desxtop

1. postgres database
- docker pull postgres
- docker volume create postgres_data
- docker run --name postgres_container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres

2. redis
- docker run -p 6379:6379 -it redis/redis-stack-server:latest

3. npm install 

4. npm run start
 

 