# 🚀 Prince TechStore - DevSecOps E-Commerce Project

## 📌 Project Overview

Prince TechStore is a **full-stack e-commerce demo application** built to demonstrate a complete **DevSecOps CI/CD pipeline** using modern cloud-native tools.

This project showcases how to:

* Build and containerize applications using Docker
* Implement CI/CD with Jenkins
* Perform security scanning (SAST & Image Scanning)
* Deploy applications on Kubernetes (AWS EKS)
* Use GitOps principles for automated deployments

---

## 🏗️ Architecture

```
User → LoadBalancer (AWS ELB)
        ↓
     Frontend (Nginx)
        ↓
     Backend (Node.js API)
        ↓
     Kubernetes (EKS Cluster)
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

---

## ⚙️ Features

* 🛒 Display products dynamically from backend API
* 🐳 Dockerized frontend & backend
* 🔄 Automated CI/CD pipeline with Jenkins
* 🔐 Code quality check using SonarQube
* 🛡️ Security scanning using Trivy
* ☁️ Deployed on AWS EKS cluster
* 🔁 GitOps-based deployment updates
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
├── backend/
│   ├── server.js
│   ├── Dockerfile
│   └── images/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── images/
│   └── Dockerfile
│
├── k8s/
│   ├── backend-deploy.yaml
│   └── frontend-deploy.yaml
│
├── Jenkinsfile
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

* CI/CD automation
* Container security
* Kubernetes deployment
* Cloud-native architecture

---

🔥 *Built with passion for DevSecOps & Cloud Engineering*
