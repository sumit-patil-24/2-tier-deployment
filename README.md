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
```
# to run application without using docker-compose
Step 1: Create a Docker Network
```
docker network create app-network
```
Step 2: Run MySQL Container
```
docker run -d --name db --network app-network \
  -e MYSQL_ROOT_PASSWORD=kastro \
  -e MYSQL_DATABASE=cricket_db \
  -v db_data:/var/lib/mysql \
  mysql:5.7

            OR ✅ With Persistent Storage (Recommended):
# Create a named volume
docker volume create mysql_data

# Run container with volume
docker run --name db \
  -e MYSQL_ROOT_PASSWORD=kastro \
  -e MYSQL_DATABASE=cricket_db \
  -v mysql_data:/var/lib/mysql \
  -d mysql:5.7
```
Step 3: Build Your Application Image
```
docker build -t my-app .
```
Step 4: Run Your Application Container
```
docker run -d --name app --network app-network \
  -p 3000:3000 \
  -e DB_HOST=db \
  -e DB_USER=root \
  -e DB_PASS=kastro \
  my-app
```

------------------------------------------

cd k8s-manifest/

# Apply in correct order
```
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f app-deployment.yaml
```

# Wait for Pods to be Ready
```
kubectl wait --for=condition=ready pod -l app=mysql --timeout=300s
```

#  Initialize Database
```
# Create the cricketers table
kubectl exec -it $(kubectl get pod -l app=mysql -o name) -- mysql -u root -pkastro cricket_db -e "
CREATE TABLE IF NOT EXISTS cricketers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);"

# Verify table creation
kubectl exec -it $(kubectl get pod -l app=mysql -o name) -- mysql -u root -pkastro cricket_db -e "SHOW TABLES;"
```

# Access Your Application
```
kubectl port-forward service/app-service 8080:80 &
```



# Task of the day is to add deployment, service and ingress resources.

# Configure RDS for database.

# Convert the menifests to helm charts.

