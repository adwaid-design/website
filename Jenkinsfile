pipeline{
    agent none
    stages{
     stage('build'){
    agent{
        label 'build-pipeline'
    }
    steps{
        deleteDir()
        sh''' 
           git clone https://github.com/adwaid-design/website.git
           ls -l
           '''
           stash name: 'website' , includes:'website/**'
    }
     }
        stage('deploy'){
        agent{
            label 'deploy-pipeline'
        }
        steps{
            deleteDir()
               unstash 'website'
               sh '''
                  sudo  cp -r website/* /var/www/html
                  '''
                  
        }
        }
    }  
}
