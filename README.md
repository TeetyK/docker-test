# Docker & Kubernetes Test Project

This project is a simple note-taking application designed to run in a containerized environment using Docker and orchestrated with Kubernetes.

## Architecture

The application is composed of three main services:
-   **Frontend:** A React application served by Nginx.
-   **Backend:** A Node.js (Express) API that handles the business logic for the notes.
-   **Database:** A MongoDB instance for persisting the notes data.

These services are deployed on a Kubernetes cluster, for example, Minikube.

## Prerequisites

Before you begin, ensure you have the following installed:
-   [Docker](httpss://www.docker.com/get-started)
-   [Minikube](httpss://minikube.sigs.k8s.io/docs/start/)
-   [kubectl](httpss://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Getting Started

Follow these steps to get the application up and running:

### 1. Build the Docker Images

First, you need to build the Docker images for the frontend and backend services.

**Build the backend image:**
```sh
cd test_product/backend
docker build -t my-backend:v1 .
```

**Build the frontend image:**
```sh
cd test_product/frontend
docker build -t my-frontend:v1 .
```

### 2. Deploy to Kubernetes

With the images built, you can now deploy the application to your Kubernetes cluster.

**Apply the Kubernetes manifests:**
This will create all the necessary deployments, services, and persistent volumes.
```sh
kubectl apply -f k8s-project.yaml
```

**Get the API Service URL:**
To connect the frontend with the backend, you need to get the URL of the API service.
```sh
minikube service api --url
```

**Update the frontend environment:**
Open the `test_product/frontend/.env` file and set the `REACT_APP_API_URL` to the URL you obtained in the previous step.

**Rebuild the frontend image:**
You need to rebuild the frontend image to include the API URL.
```sh
cd test_product/frontend
docker build -t my-frontend:v1 .
```

**Re-apply the Kubernetes manifests:**
```sh
kubectl apply -f k8s-project.yaml
```

### 3. Access the Application

To access the application, get the URL of the web service:
```sh
minikube service web
```
This will open the application in your default web browser.

## Other Examples

This repository also contains other examples in the following directories:
-   `react-nginx`: A simple example of a React application served with Nginx.
-   `vim-nginx`: An example of a VIM editor running in a container, served with Nginx.
