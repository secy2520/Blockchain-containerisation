pipeline {
    agent any

    tools {
        
        git "Default"
        nodejs 'nodejs'
    
    }
    environment {
         DOCKER_GAN_NAME = 'ganache'
         DOCKER_ETH_NAME = 'eth-backs'
         DOCKER_FRONTEND = 'gan-frontend'
         GITHUB_REPO_URL = 'https://github.com/Priyansuvaish/SPE-project.git'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                    sh 'docker --version'
                }
            }
        }
        stage('Installing hardhat')
        {
            steps {
                script 
                {
                dir("/var/lib/jenkins/workspace/eth-project/eth-backs/") 
                 {
                    sh 'npm install --save-dev hardhat --force' 
                     sh 'node -v'
                     
                 }
                }
            }
        }
        stage('Building frontend code') {
            steps {
                script {
                    dir("/var/lib/jenkins/workspace/eth-project/product-identification/") {
                        sh 'npm install --force'
                        
                        sh 'CI=false npm run build'
                    }
                }
            }
        }
            
       stage('Building and Testing Backend code') {
            steps {
                script {
                dir("/var/lib/jenkins/workspace/eth-project/eth-backs/") {
                sh 'npx hardhat compile' 
                }
            }
        }
        }
          stage('Building Docker Image for the frontend ') {
            steps {
                script {
                    // Build Docker image                   
                    docker.build("${DOCKER_FRONTEND}", '-f /var/lib/jenkins/workspace/eth-project/product-identification/Dockerfile .')
                    // }
                }
            }
        }
        
        stage('Build Docker Image for the ganache Blockchain') {
            steps {
                script {
                    // Build Docker image                   
                    docker.build("${DOCKER_GAN_NAME}", '-f /var/lib/jenkins/workspace/eth-project/dockerfile_ganache .')
                    // }
                }
            }
        }
     stage('Build Docker Image for the Backend') {
            steps {
                script {
                    // Build Docker image
                       dir("/var/lib/jenkins/workspace/eth-project/eth-backs/") {
                    docker.build("${DOCKER_ETH_NAME}", '-f /var/lib/jenkins/workspace/eth-project/eth-backs/docker_backend .')
                       }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script{
                    docker.withRegistry('', 'docker') {
                    sh 'docker tag eth-backs secy2520/eth-backs:latest'
                    sh 'docker tag ganache secy2520/ganache:latest'
                    sh 'docker tag gan-frontend secy2520/gan-frontend:latest'
                    sh 'docker push secy2520/gan-frontend'
                    sh 'docker push secy2520/eth-backs'
                    sh 'docker push secy2520/ganache'
                    }
                 }
            }
        }
        stage('Removing all present images and the containers ') {
            steps {
                script{
                   
                   sh 'docker system prune -f'
                   
                 }
            }
        }
        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory'
                     )
                }
            }
        }
    
       
     }
    }
