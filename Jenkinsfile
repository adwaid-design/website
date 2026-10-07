pipeline{
    agent any
        stages{
            stage('checkout'){
                steps{
                    deleteDir()
                    sh '''
                    git clone https://github.com/adwaid-design/website.git
                     ls -l 
                     '''
                }
                }
                stage('deploy'){
                    steps{
                        sh ''' cp -r website/* /var/www/html
                        ls -l /var/www/html
                        '''
                        
                    }
                }
            }
    }
