### 🧰 Step 1: Install kube-prometheus-stack
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

### 🚀 Step 2: Deploy the chart into a new namespace "monitoring"
```bash
kubectl create ns monitoring
```
```bash

helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
```

### ✅ Step 3: Verify the Installation
```bash
kubectl get all -n monitoring
```
- **Prometheus UI**:
```bash
kubectl port-forward service/prometheus-operated -n monitoring 9090:9090 --address=0.0.0.0
```


- **Grafana UI**: password is `prom-operator`
```bash
kubectl port-forward service/monitoring-grafana -n monitoring 8080:80 --address=0.0.0.0
```
- **Alertmanager UI**:
```bash
kubectl port-forward service/alertmanager-operated -n monitoring 9093:9093 --address=0.0.0.0
```

### 🧼 Step 4: Clean UP
- **Uninstall helm chart**:
```bash
helm uninstall monitoring --namespace monitoring
```
- **Delete namespace**:
```bash
kubectl delete ns monitoring
```
- **Delete Cluster & everything else**:
```bash
eksctl delete cluster --name observability
```
