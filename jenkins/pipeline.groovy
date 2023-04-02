pipeline {
    agent any
    environment {
        INFURA_PROJECT_ID = credentials('infura-project-id')
        INFURA_PROJECT_SECRET = credentials('infura-project-secret')
    }
    stages {
        stage('Compile') {
            steps {
                sh 'truffle compile'
            }
        }
        stage('Test') {
            steps {
                sh 'truffle test'
            }
        }
        stage('Deploy') {
            steps {
                sh "truffle migrate --network mumbai --reset --compile-all --verbose-rpc --skip-dry-run --networkCheckTimeout 10000 --dry-run"
            }
        }
    }
}
