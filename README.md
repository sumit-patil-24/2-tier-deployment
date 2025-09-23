# 2-tier-deployment
## it is a Nodejs Application which is connected to MySQL database.
## password for database is kastro, name of database is cricket_db

to run application locally run:
```
docker-compose up
```
it creates 2 docker images and container, one for application and one for database.

here we are using volumes so even if container gets down the data persists.

Note:- When you enter data, it will not get submitted to database because we have not done any configuration to the database.

steps to connect with database:-
```
docker exec -it <db_container_name> mysql -u root -p
# provide password

# first we will varify database avaliable or not:
show databases;
use cricket_db;
show tables;

# so here we dont have any tables in database that why in applicaion we are not able to enter the data.

## Create the table:
create table cricketers(
    id auto_increment primary key,
    name varchar(255) not null,
    country varchar(255) not null
)

