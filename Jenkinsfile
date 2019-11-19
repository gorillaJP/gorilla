pipeline {
  agent {
    node {
      label 'node12'
    }

  }
  stages {
    stage('Test') {
      steps {
        sh '''echo "building"
'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "build 12"

npm install'''
      }
    }

  }
  post {
    always {
      echo 'this runs alwaysx y'
    }

    success {
      echo 'This will run only if successful'
    }

    failure {
      echo 'This will run only if failed'
    }

    unstable {
      echo 'This will run only if the run was marked as unstable'
    }

    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }

  }
  triggers {
    githubPush()
  }
}