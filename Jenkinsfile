pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'peldenidup123'
        STUDENT_ID = '02250360'

        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/be-todo:${STUDENT_ID}"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/fe-todo:${STUDENT_ID}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/dso101-cicd-assignment'
            }
        }

        stage('Check Node and NPM') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% ./todo-app/backend'

                bat 'docker build -t %FRONTEND_IMAGE% ./todo-app/frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'

                    bat 'docker push %BACKEND_IMAGE%'

                    bat 'docker push %FRONTEND_IMAGE%'
                }
            }
        }
    }
}