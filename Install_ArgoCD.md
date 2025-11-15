#   Install ArgoCD

### 1. Add Argo Helm repo

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
```

### 2. Create namespace

```bash
kubectl create namespace argocd
```

### 3. Install ArgoCD

```bash
helm install argocd argo/argo-cd -n argocd
```

### 4. Verify installation

```bash
kubectl get pods -n argocd
kubectl get svc -n argocd
```

### 5. Access the ArgoCD UI

Port-forward the service:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443 --address=0.0.0.0 &
```

### 6. Get initial admin password

```bash
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

Login with:

* Username: `admin`
* Password: (above output)
