pipeline {
  agent none
  triggers {
    GenericTrigger(
      genericVariables: [
        [key: 'event', value: '$.webhookEvent'],
        [key: 'version', value: '$.version'],
        [key: 'projectId', value: '$.version.projectId'],
        [key: 'name', value: '$.version.name'],
        [key: 'description', value: '$.version.description']
      ],

      causeString: 'Triggered on $ref',
      // This token is arbitrary, but is used to trigger this pipeline.
      // Without a token, ALL pipelines that use the Generic Webhook Trigger
      // plugin will trigger. The example below was generated with `uuidgen` 
      token: '6BE4BF6E-A319-40A8-8FE9-D82AE08ABD03',
      printContributedVariables: true,
      printPostContent: true,
      silentResponse: false,
      regexpFilterText: '',
      regexpFilterExpression: ''
    )
  }
  stages {
    stage('Build') {
      steps {
        sh 'node --version'
      }
    }

    stage('Test') {
      steps {
        sh 'echo "test"'
      }
    }

    stage('Publish') {
      steps {
        sh 'echo "published"'
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
}
