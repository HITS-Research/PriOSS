# Deploy the PRIOSS Application

- To deploy the application, a developer (with access) needs to login to the SSHGate server using the below command
    ```bash
    ssh -l <imt-user-name> ssh://sshgate.cs.uni-paderborn.de
    ```
- When prompted, type 'yes' and then enter your `imt-user-password`.
- Once logged into the SSHGate server, you need to run the below command to login to the PRIOSS Server
    ```bash
    ssh prioss.cs.upb.de
    ```
- Once logged into the PRIOSS server, you need to run the below commands to pull the latest code from the git server and deploy the application
    ```bash
    sudo su
    cd /var/www/prioss/prototype/prioss/
    sudo git pull origin dev
    sudo npm install
    sudo ng build --configuration=production
    sudo rm -rvf /var/www/html/*
    sudo cp -R dist/prioss/* /var/www/html/
    cd /var/www/html
    ```
<span style="color:red">*Note:*</span> Whenever asked for **username**, enter your imt username and when asked for **password** enter your imt password.
