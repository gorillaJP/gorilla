pipeline {
  agent {
    node {
      label 'node'
    }

  }
  stages {
    stage('Test') {
      steps {
        sh 'echo "Test completed"'
      }
    }

    stage('Build') {
      steps {
        sh 'echo "build"'
      }
    }

  }
  environment {
    name = 'val'
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