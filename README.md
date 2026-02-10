# 🎬 MERN Movie App – End‑to‑End DevOps CI/CD Project

A **production‑grade, full‑stack MERN application** built from scratch and deployed using **modern DevOps practices**. This project demonstrates the complete journey — from application development to containerization, automated CI/CD, and cloud deployment on AWS.

> This is **not a tutorial project**. It follows real‑world architecture and deployment patterns used by startups and mid‑scale products.

---

## 🚀 Project Overview

The MERN Movie App allows users to browse movies, authenticate securely, and provides admin‑level role management. The focus of this project is **DevOps‑first delivery**, ensuring zero‑manual deployment using Jenkins CI/CD and Docker.

**Core Goals:**

* Build a real MERN application
* Containerize frontend & backend
* Automate build, test, and deployment
* Deploy on AWS using Docker + Nginx

---

## 🛠 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Material UI (MUI)
* Axios
* Dockerized using Nginx
* Deployed on **AWS EC2** (via Docker & Docker Compose)**

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication (Role-based access)
* Redis + BullMQ (background processing)
* Dockerized and deployed on **AWS EC2**

### DevOps & Cloud

* Docker & Docker Compose
* Jenkins (CI/CD)
* Nginx (Reverse Proxy)
* AWS EC2 (Ubuntu)
* Docker Hub (Image Registry)
* GitHub Webhooks

---

## 🧩 System Architecture

### High‑Level Architecture

* Frontend and Backend both containerized using Docker
* Deployed together on AWS EC2 using Docker Compose
* Nginx acts as a reverse proxy for routing frontend & backend traffic
* MongoDB hosted on **MongoDB Atlas**
* Jenkins handles CI/CD automation

**Flow:**

GitHub → Jenkins → Docker Build → Docker Hub → EC2 → Docker Compose → Nginx → Frontend & Backend

---

## 🔐 Authentication & Security

* JWT‑based authentication
* Role‑based access control (Admin/User)
* Environment variables injected at runtime
* Secrets stored securely in Jenkins Credentials
* `.env` files excluded using `.dockerignore`

---

## 🐳 Dockerization

Both **frontend and backend** are containerized to ensure consistency across development and production environments.

### Backend Dockerfile

* Production-ready Node.js image
* Optimized dependency installation
* Environment-based configuration (runtime env vars)

### Frontend Dockerfile

* React app built inside Docker
* Served using **Nginx** inside the container
* Optimized static asset delivery

### Docker Compose

* **frontend** service (React + Nginx)
* **backend** service (Node.js API)
* **nginx** reverse proxy service
* Shared Docker network for inter-container communication
* Port mapping handled only at Nginx level
* Simple container restarts and updates via `docker-compose up -d`

---

## ⚙️ CI/CD Pipeline (Jenkins)

### Pipeline Stages

1. **Checkout Code** from GitHub
2. **Build Docker Image**
3. **Push Image to Docker Hub**
4. **SSH into AWS EC2**
5. **Pull Latest Image**
6. **Restart Containers using Docker Compose**

### Jenkins Features Used

* Declarative Pipeline
* Docker Hub Credentials
* SSH Credentials
* Environment Variables
* Post‑deployment verification

---

## ☁️ AWS Deployment

* EC2 (Ubuntu) instance
* Docker & Docker Compose installed
* Jenkins server configured
* Nginx exposed on port 80
* Backend container running on private ports

---

## 📂 Repository Structure

Below is the **complete repository structure**, including **application development files** and **DevOps / deployment-related files** used for production deployment:

```
MERN-MOVIE-APP
│
├── backend/                     # Node.js + Express backend service
│   ├── config/                  # DB & app configuration
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   ├── controllers/             # Business logic
│   ├── queues/                  # BullMQ queues
│   ├── workers/                 # Background workers
│   ├── server.js                # App entry point
│   ├── package.json
│   └── Dockerfile               # Backend Docker image
│
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/                 # API service layer
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # App pages
│   │   ├── redux/               # Redux Toolkit store
│   │   └── App.jsx
│   ├── nginx.conf               # Nginx config for frontend container
│   ├── package.json
│   └── Dockerfile               # Frontend Docker image
│
├── nginx/                       # Reverse proxy configuration
│   └── nginx.conf               # Routes frontend & backend traffic
│
├── docker-compose.yml           # Orchestrates frontend, backend & nginx
├── Jenkinsfile                  # Jenkins CI/CD pipeline
├── .dockerignore                # Excludes files from Docker build
├── .gitignore                   # Git ignored files
├── README.md                    # Project documentation
└── screenshots/                 # App, CI/CD & deployment screenshots
```

This structure reflects a **real-world production setup**, where application code and DevOps automation coexist in a single repository.

---

## 🧠 Key Learnings

* Writing multistage Dockerfiles
* Jenkins pipeline automation
* Secure credential management
* Cloud deployment strategies
* Reverse proxy configuration

---

## 🚀 Future Improvements

* Kubernetes migration (EKS)
* Prometheus + Grafana monitoring
* Terraform for infrastructure

---

## 👤 Author

**Prathmesh Shinde**

---

⭐ If you found this project helpful, consider starring the repository!
