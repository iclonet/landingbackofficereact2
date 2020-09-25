pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-p 3000:3000'
        }
    }
    environment { 
        REACT_APP_FLAVOR = 'base'
    }
    stages {
        stage('Build') {
            steps {
				sh 'cd ./client'
                sh 'cp -r ./flavor/${REACT_APP_FLAVOR}/* ./public/'
				sh 'REACT_APP_FLAVOR=${REACT_APP_FLAVOR} npm run build'
            }
        }
        stage('Deliver') { 
            steps {
                sh 'rm -Rf /home/base/*'
                sh 'cp build/* /home/base/'
            }
        }
    }
}