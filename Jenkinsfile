pipeline {
    agent any

    stages {
        stage("Set Variable") {
            steps {
                script {
                    DOCKERHUB_CREDENTIAL = "dockerhub-viniu595"
                    DOCKER_IMAGE_NAME = "vini_blog"
                    DOCKER_IMAGE_STORAGE = "viniu595"
                    DOCKER_IMAGE_TAG = "release-1"
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    image = docker.build("${DOCKER_IMAGE_STORAGE}/${DOCKER_IMAGE_NAME}")
                }
            }
        }

        stage("Push Docker Image to Dockerhub") {
            steps {
                script {
                    docker.withRegistry("", DOCKERHUB_CREDENTIAL) {
                        image.push("$DOCKER_IMAGE_TAG")
                        image.push("latest")
                    }
                }
            }
        }
    }

}