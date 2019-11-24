pipeline {
  agent {
    node {
      label 'node12'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh ./jenkins/scripts/build.sh
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