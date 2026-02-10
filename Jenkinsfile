pipeline {
    agent any

    environment {
        DOCKER_BACKEND_IMAGE  = "thepratham21/mern-movie-app-backend"
        DOCKER_FRONTEND_IMAGE = "thepratham21/mern-movie-app-frontend"
        APP_SERVER = credentials('app-ec2-host')
        APP_DIR    = "/home/ubuntu/MERN-MOVIE-APP"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/thepratham21/MERN-MOVIE-APP.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                sh '''
                cd backend
                npm install
                '''
            }
        }

        stage('Run Backend Jest Tests') {
            steps {
                sh '''
                cd backend
                npm test
                '''
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                   
                    def gitSha = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.GIT_SHA = gitSha
                    echo "Using Git SHA: ${gitSha}"

                    sh """
                    # Build Backend Image
                    docker build -t ${DOCKER_BACKEND_IMAGE}:latest backend
                    docker tag ${DOCKER_BACKEND_IMAGE}:latest ${DOCKER_BACKEND_IMAGE}:${gitSha}

                    # Build Frontend Image
                    docker build \
                      --no-cache \
                      -t ${DOCKER_FRONTEND_IMAGE}:latest \
                      -f frontend/Dockerfile \
                      frontend
                    docker tag ${DOCKER_FRONTEND_IMAGE}:latest ${DOCKER_FRONTEND_IMAGE}:${gitSha}
                    """
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh """
                    
                    docker push ${DOCKER_BACKEND_IMAGE}:latest
                    docker push ${DOCKER_BACKEND_IMAGE}:${GIT_SHA}

                    docker push ${DOCKER_FRONTEND_IMAGE}:latest
                    docker push ${DOCKER_FRONTEND_IMAGE}:${GIT_SHA}
                    """
                }
            }
        }

        stage('Deploy via Docker Compose') {
            steps {
                sshagent(['app-ec2-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${APP_SERVER} "
                        cd ${APP_DIR} &&
                        docker compose pull &&
                        docker compose up -d
                    "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "CI/CD complete. MERN MOVIE APP deployed on EC2 via Docker Compose."
        }
        failure {
            echo "Pipeline failed !"
        }
    }
}
