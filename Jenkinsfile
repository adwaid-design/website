pipeline{
    agent none
    stages{
     stage('build'){
    agent{
        label 'bulid-pipeline'
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
                  cp -r website/* /var/www/html
                  '''
                  
        }
        }
    }  
}
