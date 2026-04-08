# 🚀 DevSecOps TechStore Project

## 📌 Project Overview

**DevSecOps TechStore Project** is a **full-stack e-commerce demo application** built to demonstrate a complete **DevSecOps CI/CD pipeline** using modern cloud-native tools.

This project showcases how to:

* Build and containerize applications using Docker
* Implement CI/CD with Jenkins
* Perform security scanning (SAST & Image Scanning)
* Deploy applications on Kubernetes (AWS EKS)
* Use GitOps principles for automated deployments
* **Establish Full-Cluster Observability with Prometheus & Grafana**

---

## 🏗️ Architecture

```
User → LoadBalancer (AWS ELB)
        ↓
     Frontend (Nginx)
        ↓
     Backend (Node.js API)
        ↓
     Kubernetes (EKS Cluster)  ←── Monitoring (Prometheus & Grafana)
```

---

## 🛠️ Tech Stack

### 🔹 Frontend

* HTML, CSS, JavaScript
* Nginx (for serving static files)

### 🔹 Backend

* Node.js (Express.js)
* REST API

### 🔹 DevOps Tools

* Docker & DockerHub
* Jenkins (CI/CD Pipeline)
* SonarQube (SAST - Code Quality)
* Trivy (Container Image Scanning)
* Kubernetes (EKS)
* GitHub (Version Control)
* **Prometheus & Grafana (Monitoring & Observability)**
* **ArgoCD (GitOps CD)**

---

## ⚙️ Features

* 🛒 Display products dynamically from backend API
* 🐳 Dockerized frontend & backend
* 🔄 Automated CI/CD pipeline with Jenkins
* 🔐 Code quality check using SonarQube
* 🛡️ Security scanning using Trivy
* ☁️ Deployed on AWS EKS cluster
* 🔁 GitOps-based deployment updates
* 📊 **Real-time Monitoring & Dashboards (Prometheus/Grafana)**
* 🎨 Responsive and modern UI

---

## 🔄 CI/CD Pipeline Flow

1. **Code Checkout** from GitHub
2. **SAST Scan** using SonarQube
3. **Quality Gate Validation**
4. **Build Docker Images**
5. **Image Security Scan** using Trivy
6. **Push Images** to DockerHub
7. **Update Kubernetes Manifests**
8. **Deploy via GitOps (ArgoCD Ready)**

---

## 🐳 Docker Images

* Backend: `prince511/ecommerce-backend`
* Frontend: `prince511/ecommerce-frontend`

---

## ☸️ Kubernetes Deployment

* **Frontend**
  * Deployment + LoadBalancer Service
* **Backend**
  * Deployment + ClusterIP Service

---

## 🌐 Live Application

👉 Access the application using AWS LoadBalancer URL:

```
http://<your-loadbalancer-url>
```

---

## 📁 Project Structure

```
E-commerce-DevSecOps/
│
├── backend/            # Express API & Dockerfile
├── frontend/           # Static Client & Dockerfile
├── k8s/                # Kubernetes Manifests
│   ├── backend-deploy.yaml
│   └── frontend-deploy.yaml
├── Jenkinsfile         # CI/CD Pipeline logic
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Clone Repo

```bash
git clone https://github.com/your-username/E-commerce-DevSecOps.git
cd E-commerce-DevSecOps
```

### 2. Build Docker Images

```bash
docker build -t backend ./backend
docker build -t frontend ./frontend
```

### 3. Run Containers

```bash
docker run -d -p 5000:5000 backend
docker run -d -p 80:80 frontend
```

---

## 🔐 Security Practices Implemented

* ✅ Static Code Analysis (SonarQube)
* ✅ Image Vulnerability Scanning (Trivy)
* ✅ Minimal base images (Alpine)
* ✅ CI/CD security checks

---

## ⭐ Learning Outcome

This project demonstrates real-world DevSecOps practices including:

* **Infrastructure**: AWS EKS (Kubernetes)
* **CI/CD**: Jenkins + GitOps (Image Tag Automation)
* **Security**: SonarQube (SAST) + Trivy (Image Scanning)
* **Observability**: Prometheus & Grafana (Cluster Monitoring)
* **Availability**: Zero-downtime Rolling Updates 

---

🔥 *Built with passion for DevOps & Cloud Engineering*
