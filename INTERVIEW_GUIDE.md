# 🎓 DevSecOps TechStore Project: Interview Guide

This guide is designed to help you explain your project confidently during technical interviews.

---

### 1. The "Elevator Pitch" (Introduction)
*"I built a full-stack e-commerce DevSecOps project called **TechStore**. The goal was to demonstrate a complete, automated lifecycle from code to production on **AWS EKS**, focusing on **Shift-Left Security** and **GitOps**. I integrated CI/CD with Jenkins, security scanning with SonarQube and Trivy, and automated deployments using ArgoCD."*

---

### 2. The Detailed Workflow (The "Story" of your Code)
When an interviewer says: **"Walk me through your pipeline,"** follow these steps:

1.  **Source Control (GitHub)**: "It starts with a developer pushing Node.js code to GitHub."
2.  **Continuous Integration (Jenkins)**: "Jenkins detects the change and triggers the pipeline. The first few stages focus on security and quality."
3.  **SAST (SonarQube)**: "I integrated SonarQube to perform Static Analysis. It checks for bugs, code smells, and security hotspots. I used a **Quality Gate** to ensure the build stops if standards aren't met."
4.  **Security Scanning (Trivy - FS)**: "Before building the image, I use Trivy to scan the filesystem for any vulnerable dependencies."
5.  **Build & Push (Docker)**: "Once safe, I use Docker to build the frontend and backend images and push them to **Docker Hub** with unique build tags."
6.  **Image Scanning (Trivy - Image)**: "After the push, I run another Trivy scan on the actual container image to ensure the base layers are secure."
7.  **GitOps Loop (ArgoCD)**: "This is the most critical part. Instead of Jenkins pushing to K8s, the pipeline updates the image tags in my **GitHub Manifests**. **ArgoCD** then detects this change and 'pulls' the new state into the **AWS EKS** cluster. This ensures the cluster always matches the Git repo."
8.  **Observability (Prometheus & Grafana)**: "Finally, I monitor the cluster health and application performance using a Prometheus and Grafana stack."

---

### 3. The "Why" Section (The Big Questions)

**Q: Why use ArgoCD instead of just 'kubectl apply' in Jenkins?**
*   **A**: "Using 'kubectl apply' in Jenkins is 'Push-based'. GitOps (ArgoCD) is 'Pull-based'. It's more secure (Jenkins doesn't need cluster access) and it fixes 'Configuration Drift'—if someone changes a setting manually in K8s, ArgoCD will automatically sync it back to what's in Git."

**Q: Why use Trivy?**
*   **A**: "Trivy is fast and accurate. It covers both the filesystem scan and the final container image scan, which fits perfectly into a DevSecOps pipeline."

**Q: Why AWS EKS?**
*   **A**: "It’s a managed service. It allows me to focus on the DevSecOps flow while AWS manages the Kubernetes control plane for reliability and scaling."

---

### 4. Key Challenges & Successes (The STAR Method)

*   **Situation**: I wanted to ensure that no insecure code ever reached the cluster.
*   **Task**: I had to integrate multiple security tools without slowing down the developer too much.
*   **Action**: I set up automated Quality Gates in SonarQube and sequential Trivy scans. I also automated the GitOps tag updates using 'sed' commands in the Jenkinsfile.
*   **Result**: A fully hands-off pipeline where security is enforced automatically 100% of the time.

---

### 5. Future Improvements (Shows you are always learning)
*   *"In the future, I plan to integrate HashiCorp Vault for secrets management and use Terraform for the entire infrastructure provisioning (IaC)."*

---

### 7. 📜 Deep Dive: The Jenkinsfile Breakdown

An interviewer might ask: **"Explain your Jenkinsfile structure."** Here is the breakdown:

#### **Stage 1: Checkout**
*"I use the Git plugin to pull the latest code from my main branch. This ensures the pipeline starts with the freshest code commit."*

#### **Stage 2: SAST (SonarQube)**
*"I use the SonarQube Scanner tool. It scans the source code for security hotspots and bugs before we even build the containers. This is 'Shift-Left' security in action."*

#### **Stage 3: Quality Gate**
*"I use the `waitForQualityGate` step. This is a critical checkpoint—if SonarQube marks the code as 'Failed' (due to high technical debt or security issues), the pipeline aborts immediately to protect production."*

#### **Stage 4: Build Docker Images**
*"I use a scripted block to build two separate images: one for the frontend and one for the backend. I tag them with the `${env.BUILD_NUMBER}` to ensure every build has a unique, traceable version."*

#### **Stage 5: Image Scanning (Trivy)**
*"Before pushing to the registry, I scan the images using Trivy. I filter for 'HIGH' and 'CRITICAL' vulnerabilities. This ensures we don't push 'poisoned' containers to our registry."*

#### **Stage 6: Push to Docker Hub**
*"I use `withCredentials` to securely log in to Docker Hub. I push the image with the specific build tag and also a `latest` tag for the current production version."*

#### **Stage 7: Update K8s Manifests (The GitOps Trigger)**
*"This is the link between CI and CD. I use `sed` commands to find and replace the old image tags in my `k8s/` files with the new build tag. Then, Jenkins commits and pushes these changes back to GitHub. This push is what ArgoCD sees to trigger the deployment."*

#### **Post Actions: Email Notifications**
*"Finally, I use the `mail` plugin in the `post` block. It sends a success or failure alert to my email so I’m always aware of the deployment status without having to check the Jenkins dashboard manually."*

---

**Final Interview Advice**: Mention that this is a **Declarative Pipeline**. It’s the modern way to write Jenkinsfiles because it's structured, easier to read, and supports better error handling.

Interviewers often ask: **"What would you do if X failed?"** Here is how to answer:

**Q: What if the ArgoCD Sync fails or stays in "Out of Sync"?**
*   **A**: "I would first check the application events and logs in the ArgoCD UI. Common causes are incorrect image tags in the manifests or resource quota limits in the EKS cluster. I’d verify if the Jenkins pipeline successfully pushed the new tag to the manifest repository."

**Q: What if a Pod is in "CrashLoopBackOff" after deployment?**
*   **A**: "I would use `kubectl logs <pod-name>` or `kubectl describe pod <pod-name>` to check the error. It’s often a missing environment variable, a database connection failure, or a port mismatch between the container and the service definition."

**Q: What if SonarQube fails the Quality Gate?**
*   **A**: "That means the pipeline worked exactly as designed! I would go to the SonarQube dashboard, identify the 'Blocker' or 'Critical' issues, fix the code, and re-run the pipeline."

**Q: How do you troubleshoot connection issues between Frontend and Backend in K8s?**
*   **A**: "I check the Service names and DNS. In Kubernetes, the frontend should reach the backend using the ClusterIP service name (e.g., `http://backend-service:5000`). I’d also check the backend logs to see if it’s actually receiving the requests."

**Q: What if Prometheus isn't showing any metrics?**
*   **A**: "I would check the 'Status -> Targets' page in Prometheus to see if it is successfully scraping the pods. Usually, it's missing labels in the pods or services that don't match the Prometheus scraper configuration."
