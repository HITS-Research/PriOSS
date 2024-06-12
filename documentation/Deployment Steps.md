# Deploy the PRIOSS Application
- To get access to the VM, contact the IMT and request access for prioss.cs.upb.de
- To deploy the application, a developer (with access) needs to login to the SSHGate server using the below command
    ```bash
    ssh <imt-user-name>@sshgate.cs.uni-paderborn.de
    ```
- When prompted, type 'yes' and then enter your `imt-user-password`.
- Once logged into the SSHGate server, you need to run the below command to login to the PRIOSS Server
    ```bash
    ssh prioss.cs.upb.de
    ```
<span style="color:red">*Note:*</span> We are using __Project Access Tokens__ to authenticate against Gitlab. The current Token is valid until __2025-06-11__. If you need to renew the Token, you can do it in Project Settings > Access Tokens. repository read access rights are enough. 
To use the token, make sure, that the credentials are stored with `git config credential.helper store` (run it in `/var/www/prioss`) and the `git pull`. On the first git pull you will be asked for credentials, enter the token name as the username and the token as the password. it will then be stored in the git config until it is invalid. then you have to enter a new token on the next `git pull`. 
- Once logged into the PRIOSS server, you need to run the below commands to pull the latest code from the git server and deploy the application
    ```bash
    sudo su
    ./deploy.sh
    ```
    
# Automatic Deployment
On the Prioss VM, a cron job (root user) runs every five minutes, that executes the deploy script. If the script detects, that the remote repo has newer changes than the local repo in the dev branch, it builds and deploys the new version.