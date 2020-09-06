pipeline {
  agent {
    node {
      label 'node12'
    }
  }
  parameters {
    gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH'
  }
  stages {

    echo 'branch details' 
    echo env.BRANCH_NAME
    echo env

    stage('Build') {
      steps {
        sh '''whoami
/usr/local/bin/docker-compose up --build -d'''
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