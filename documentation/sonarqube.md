Please contact Siegfried Albrecht (mail@albrecht-s.de), if you need the credentials for sonarqube.

# Installation
## Server
Sonarqube is hosted on prioss.cs.upb.de, check out the (DevOps Docs)[.] [DevOps Docs](./Deployment%20Steps.md) on how to connect to it.

Its hosted as a Docker Service with user root in `/root/docker/sonarqube`.
### Server Preparations
#### Container Preparation
You have to set 
```bash 
sysctl vm.max_map_count=262144
```
or else the Container will not run.

#### Firewall
Sonarqube runs on Port 9000, the IPtables rule is

```
iptables --append INPUT --protocol tcp --src 131.234.0.0/24 --dport 9000 --jump ACCEPT
```

It was persisted by installing
```
apt install iptables-persistent -y
```

The rules were saved during the installation process, but can also be saved by running 
```
netfilter-persistent save
```
#### NGINX
The NGINX Configuration is saved in
```
/etc/nginx/sites-available/sonarqube
```

the server uses the same TLS certificate as the main website.

Docker exposes the Server only on 127.0.0.1
```
managed root@prioss.cs ~/docker/sonarqube
$ docker ps --format "{{.ID}}\t{{.Names}}\t{{.Ports}}"
359ef31daf31    sonarqube       127.0.0.1:9000->9000/tcp
e33863fc4667    postgresql      5432/tcp
```
##### Exposure of Sonarqube
In the NGINX Config we limit the Clients, that are allowed to Connect to the UPB net `131.234.0.0/16`, so you can only connect using vpn or when you are in the university (eduroam/computer in poolrooms)

## Sonarqube Container
The Container and Database is started with docker compose.

The docker-compose.yml file is located in
```
/root/docker/sonarqube/docker-compose.yml
```

### docker-compose.yml configuration 
Additions to the default docker-compose.yml provided by [Sonarqube](https://github.com/SonarSource/docker-sonarqube/blob/master/example-compose-files/sq-with-postgres/docker-compose.yml)

There is a `.env` file, where the versions and some environment variables like database password, database user, etc. for the Docker Images are saved
```bash
$ cat /root/docker/sonarqube/.env 
POSTGRES_VERSION=15
SONARQUBE_VERSION=10.6.0-community
DB_PASSWORD=<redacted>
DB_USER=sonar
DB=sonar
```

#### Environment Variables
Allow SSO with Gitlab
```
SONAR_WEB_SSO_ENABLE: true
```
Branch Plugin 
```
SONAR_WEB_JAVAADDITIONALOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.19.1.jar=web

SONAR_CE_JAVAOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.19.1.jar=ce
```
### branch-plugin
To show Sonarqube Quality Gate Messages in Merge Restes in Github, I installed the Plugin
[sonarqube-community-branch-plugin](https://github.com/mc1arke/sonarqube-community-branch-plugin). Because it seems, that its not maintained anymore and the most recent version did not work for `SonarQube 10.6.0`, i installed the version provided by https://github.com/phoval/sonarqube-community-branch-plugin .

Checkout the Issue: https://github.com/mc1arke/sonarqube-community-branch-plugin/issues/926

#### Installation of branch-plugin
Download the Plugin and put it in the Extensions Volume
```
/var/lib/docker/volumes/sonarqube_sonarqube_extensions/_data/plugins/
```

Edit the docker-compose file and add theses two environment variables:
```
SONAR_WEB_JAVAADDITIONALOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.19.1.jar=web

SONAR_CE_JAVAOPTS: -javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.19.1.jar=ce
```

Restart the sonarqube container
```
docker compose up -d sonarqube
```

## Configuration of Sonarqube
Because we want to integrate Sonarqube with Gitlab, we have two Places, where we need to edit settings
1. Gitlab https://git.cs.upb.de
2. Sonarqube https://prioss.cs.upb.de:9000

We also have to perform multiple steps for the setup:
1. Authentication of group members
2. Adding the project
3. Setting permissions for project

The documentation of Sonarqube is excellent! So i will just briefly show the places, where I changed something. YOu should rely on their docs to configure something. Seriously, its reallly well done.

### Authentication
#### Gitlab
I created a Group [PriOSS](https://git.cs.uni-paderborn.de/prioss) on Gitlab, where each Member has to be part of. Only members of this group can connect to the sonarqube instance.

The Group has an [Application Sonarqube](https://git.cs.uni-paderborn.de/groups/prioss/-/settings/applications) where the callback URL for OAuth is defined

#### Sonarqube
The settings are located here: https://prioss.cs.upb.de:9000/admin/settings?category=authentication&tab=gitlab

You need to have admin rights to see this. 

###### Sonarqube Groups
I added a group, that corresponds to the gitlab group here: https://prioss.cs.upb.de:9000/admin/groups

You can set permissions here:
https://prioss.cs.upb.de:9000/admin/permissions

### Adding the Project
Just follow the Steps provided by Sonarqube, its stupid simple.

The important files on gitlab are 
```
gitlab-ci.yml
sonar-project.properties
```

Relevant Settings:

Access Tokens: https://git.cs.uni-paderborn.de/ekablo/prioss/-/settings/access_tokens

CI/CD Variables: https://git.cs.uni-paderborn.de/ekablo/prioss/-/settings/ci_cd

### Permissions for the Project
All members can administer issues and security hotspots and also execute analysis
