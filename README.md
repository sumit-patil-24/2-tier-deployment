# 🚀 Deployment of 2 tier Application 

##  Overview
This is End to End project to deploy 2 tier application using Github Actions as CI and ArgoCD for CD, where any commit on Application triggres CI pipeline which first build and pushes the application and updates the image tag on helm charts.

## Pipeline workflow
1. checkout code from GitHub.  
2. GitHub Actions builds and pushes Docker image to Docker Hub.  
3. Updates the value of docker image to helm folder.  
4. Argo CD pick ups the changes and Deployes Application.  
---


## Step-by-Step guide to deploy application
1. **Install prerequisites(kubectl, aws cli, eksctl, configure aws cli)**

2. **Setup EKS Cluster**
  - https://github.com/sumit-patil-24/2-tier-deployment/blob/a5c1684cca989b852a0db65f94c99ff4507ff805/Cluster_setup.md

3. **Install helm**
   ```bash
   sudo snap install helm --classic
   ```

4. **Install Argo CD using helm**
  - https://github.com/sumit-patil-24/2-tier-deployment/blob/7a1af37fa07b979fe98f3da25a62342584d54dc6/Install_ArgoCD.md

5. **Deploy application using loadbalancer service type**

6. **Install monitoring stack using helm**
- https://github.com/sumit-patil-24/2-tier-deployment/blob/11b4e8d5c2a07c1dc7892a74638e25e71b21cad5/monitoring-setup.md

---

## 🪜 Setup & Screenshots

### 1️⃣ EC2 Instance Running
<img width="1560" height="715" alt="Screenshot 2025-10-18 101208" src="https://github.com/user-attachments/assets/78bd06ac-62a0-49ca-9fe0-7e152bc00bc8" />

### 2️⃣ Argo CD 
<img width="1630" height="852" alt="Screenshot 2025-10-18 101224" src="https://github.com/user-attachments/assets/a9a1425b-f235-4bc7-91ad-63770d8b828b" />

### 3️⃣ Data getting stored in database
<img width="1622" height="870" alt="Screenshot 2025-10-18 101321" src="https://github.com/user-attachments/assets/37afc209-b5fa-4ef8-9fc2-a86178316794" />

### 4️⃣ Running Application
<img width="1919" height="963" alt="Screenshot 2025-10-18 101302" src="https://github.com/user-attachments/assets/4eddbd16-9483-47e1-8f88-46d52d8608c8" />

### 5️⃣ Docker image getting pushed to dockerhub
<img width="922" height="788" alt="Screenshot 2025-10-18 101242" src="https://github.com/user-attachments/assets/62151bb8-2fab-44d3-b101-a90699ea9703" />

### 6️⃣ Grafana to watch node status(cpu utilization, memory utilization, disk utilization)
<img width="1919" height="965" alt="Screenshot 2025-11-13 182152" src="https://github.com/user-attachments/assets/6481e419-21b0-4021-b1b3-38b2a19e34be" />

### Note:-
we need to create table to insert data from application.
steps:-
  - kubectl exec -it <mysql-pod-name> -- /bin/bash
  - mysql -u root -p

### Future Work:
1. Deploy using EKS Cluster
