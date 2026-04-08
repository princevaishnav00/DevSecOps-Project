pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_HUB_USERNAME = 'prince511'
        BACKEND_IMAGE = "${DOCKER_HUB_USERNAME}/ecommerce-backend"
        FRONTEND_IMAGE = "${DOCKER_HUB_USERNAME}/ecommerce-frontend"
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                 git branch: 'main', url: 'https://github.com/princevaishnav00/DevSecOps-Project.git'
            }
        }

        stage('SAST (SonarQube)') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv('SonarQubeSer') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=ecommerce-app -Dsonar.sources=."
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForityGate abortPipeline: false
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend"
                    sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend"
                }
            }
        }

        stage('Image Scanning (Trivy)') {
            steps {
                script {
                    sh "trivy image --severity HIGH,CRITICAL ${BACKEND_IMAGE}:${TAG}"
                    sh "trivy image --severity HIGH,CRITICAL ${FRONTEND_IMAGE}:${TAG}"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_HUB_CREDENTIALS_ID, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push ${BACKEND_IMAGE}:${TAG}"
                        sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                        
                        // Push latest tag as well
                        sh "docker tag ${BACKEND_IMAGE}:${TAG} ${BACKEND_IMAGE}:latest"
                        sh "docker push ${BACKEND_IMAGE}:latest"
                        sh "docker tag ${FRONTEND_IMAGE}:${TAG} ${FRONTEND_IMAGE}:latest"
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

       stage('Update K8s Manifests (GitOps)') {
    steps {
        script {
            

            // Update image tags
            sh """
            sed -i 's|image: .*/ecommerce-backend:.*|image: ${BACKEND_IMAGE}:${TAG}|g' k8s/backend-deploy.yaml
            sed -i 's|image: .*/ecommerce-frontend:.*|image: ${FRONTEND_IMAGE}:${TAG}|g' k8s/frontend-deploy.yaml
            """

            // Commit & push changes
           withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
           sh """
           git config user.email "jenkins@example.com"
           git config user.name "jenkins"
           git add k8s/
           git commit -m "Update image tag to ${TAG}" || echo "No changes to commit"
           git push https://\${GIT_USER}:\${GIT_PASS}@github.com/princevaishnav00/DevSecOps-Project.git HEAD:main
           """
           }
         } 
       }
    }
  }


  post {
    success {
       mail to: 'princevaishnav936@gmail.com',
            subject: "Pipeline SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Great news! The pipeline finished successfully.\n\nCheck it out here: ${env.BUILD_URL}"
    }
    failure {
       mail to: 'princevaishnav936@gmail.com',
            subject: "Pipeline FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Oops! There was an issue with the build.\n\nSee the logs here: ${env.BUILD_URL}"
    }
  }
}
