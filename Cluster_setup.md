# Cluster Creation Guide

## Pre-requisites
1. **AWS CLI**
2. **eksctl**
3. **kubectl**

## Commands for Cluster Creation
1. **Create Cluster with EC2 Spot Instances**:
   ```bash
    eksctl create cluster --name jar-demo-cluster --region ap-south-1 --nodes 2 --nodes-min 2 --nodes-max 3 --node-type t3.medium --managed --spot

2. **Update kubeconfig**: This command updates the local kubeconfig file, enabling kubectl to authenticate and manage resources in the EKS cluster.
   ```bash
   aws eks update-kubeconfig --name jar-demo-cluster --region ap-south-1

3. **Associate IAM OIDC Provider**: Associating an IAM OIDC provider with the cluster enables IAM roles for service accounts, allowing your workloads to use IAM permissions directly.
   ```bash
   eksctl utils associate-iam-oidc-provider --cluster demo-cluster --approve

---

# Setting up the AWS ALB as an Ingress Resource using an Ingress Controller

1. **Download the IAM Policy**: The IAM policy is required to allow the ALB controller to interact with ALB and other AWS resources. Download it using the following command:
   ```bash
   curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json

2. **Create the IAM Policy**: This command creates an IAM policy named AWSLoadBalancerControllerIAMPolicy
   ```bash
   aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json

3. **Create an IAM Role and Service Account**: Create an IAM role and a Kubernetes service account to associate with the ALB controller.
   ```bash
   eksctl create iamserviceaccount \
    --cluster=jar-demo-cluster \
    --namespace=kube-system \
    --name=aws-load-balancer-controller \
    --role-name AmazonEKSLoadBalancerControllerRole \
    --attach-policy-arn=arn:aws:iam::<your-aws-account-id>:policy/AWSLoadBalancerControllerIAMPolicy \
    --approve \
    --override-existing-serviceaccounts
  

4. **Add the Helm Repository**: Add the EKS chart repository to Helm to access the AWS Load Balancer Controller chart
   ```bash
   helm repo add eks https://aws.github.io/eks-charts
   helm repo update

5. **Install the AWS Load Balancer Controller**: This will use the service account created earlier.
   ```bash
   helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system \
    --set clusterName=demo-cluster \
    --set serviceAccount.create=false \
    --set serviceAccount.name=aws-load-balancer-controller \
    --set region=ap-south-1 \
    --set vpcId=<your-vpc-id>

After completing these steps,ALB controller will be configured and able to manage load balancers within the EKS cluster.
