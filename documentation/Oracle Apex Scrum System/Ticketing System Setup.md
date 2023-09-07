# Scrum Ticketing System Setup

## Introduction

Our scrum ticketing system is made by us using the low-code platform oracle apex. 

We decided to roll our own ticketing system for scrum because the available ones we found would not have allowed us to have one user account each for all of our 14 developers while still being free.

Documentation and guides on Oracle Apex can be found all over the internet, just make sure to google for "oracle apex" and not just "apex" because the latter will lead to guides for salesforce apex or the videogame apex legends.

We have been hosting our apex application in an autonomous database in the oracle cloud infrastructure (OCI) so it was available on the internet for all our members. 

To do this as well you will need an always free oracle cloud account, which you can create on the following page: https://www.oracle.com/de/cloud/sign-in.html 

This file only contains a brief guide on how you can setup the ticketing system in the oracle cloud. There are more expansive guides for these tasks available on the web, so please have a look at those if this guide is not concrete enough for your needs in any ways. Search terms would be things like "setup autonomous database OCI" "setup oracle apex OCI" "Oracle Apex import application".

## Setting Up the Cloud Infrastructure 

Once you have created an oracle cloud account, you have to log into it. Note that your Cloud-Accountname is likely different from your account's username. You have to remember both to get into your account.

We next need to create a autonomous database. This is a database managed by oracle, so you don't have to deal with updating it, for example. In an always free account there are two autonomous databases with 20GB storage capacity each included. 20GB is plenty for text content but you should look out that you do not upload to many large picture and similar large files. Especially photos taken from smartphones tend to fill up such a database rather quickly.

To create a database, go to the menu and navigate to Oracle Database > Autonomous Database. A view similar to the following should appear, just that you won't have any databases listed:

![image-20230825095059612](Ticketing System Setup.assets/image-20230825095059612.png)

Here click on Create Autonomous Database to create a new one. A view similar to the following will appear:

![image-20230825095244467](Ticketing System Setup.assets/image-20230825095244467.png)

The most important setting here is under "Choose workload type" here you should choose "Transaction Processing" or "APEX". The "APEX" option will lack some management features compared to Transaction processing but it will be the easiest to work with. Since those features are likely to not be relevant to you, we recommend going with "APEX".

If you scroll further down, there will be some more settings that you can mostly leave at the default. One crucial one is setting your admin user password for inside the database:

![image-20230825095610904](Ticketing System Setup.assets/image-20230825095610904.png)

Make sure to save this password securely as it gives complete control over the database.

After you've successfully created your database, you have to create an APEX instance within it. To do this, go to the menu again and navigate to Developer Services > APEX Application Development. It will show a similar screen to the database screen before, but again without any created instances in the list:

![image-20230825095901524](Ticketing System Setup.assets/image-20230825095901524.png)

Here you click on Create APEX service. This view will look similar to the one for the database creation and you have to again set an admin password and choose names for the instance.

After the instance creation, the new apex instance should show up in the list. Click on its name on the leftm and you will see a screen with a Launch APEX button:

![image-20230825100341239](Ticketing System Setup.assets/image-20230825100341239.png)

Note that it can take some time until the database and the APEX instance are actually available (look at the state in the table above). But this should only be a view minutes.

When clicking on "Launch APEX" a new browser tab should open showing a page similar to this:

![image-20230825104420460](Ticketing System Setup.assets/image-20230825104420460.png)

Or this:

![image-20230825104444705](Ticketing System Setup.assets/image-20230825104444705.png)

The former is the workspace signin which you will use in the future to get into the development workspace from where you can edit the APEX application and database objects. The latter is the Administation Services signin where you can only login using the ADMIN account for APEX (not for the Database!) that you setup a password for earlier. If you are at the Workspace Signin, there is a link below the green button that says "Administration Services" which leads you to the Administration Services login.

Login using your admin account in the Administration Services and you'll see a view similar to this:

![image-20230825104740364](Ticketing System Setup.assets/image-20230825104740364.png)

Here you need to create your Workspace that will house your apex application(s) and under "Manage Workspaces" you can create a user for created workspaces that you can then use to login into the workspace via the Workspace Signin Page by going to "Manage Workspaces" > "Manage Application Developers and Users".

Create a workspace here, remember the name and also create a user account for yourself. You should not use the admin user for regular development inside your apex workspace.

Afterwards you can go back to the Workspace Signin page, enter your workspace name as well as username and password. This will lead you to the actual development environment of Oracle Apex:

![image-20230825105130581](Ticketing System Setup.assets/image-20230825105130581.png)

### Setup Database Schema

First we want to install the database object, for example the tables, that the app needs. For this go to SQL Workshop > SQL Scripts:

![image-20230825105303918](Ticketing System Setup.assets/image-20230825105303918.png)

There won't be any scripts shown for you, but you should change that by clicking in "Upload" and uploading the schema_definition.sql/scrum-ticketing/src. Let's quickly explain what kind of source files exist in this folder:

#### Source files

The sources needed to setup the ticketing system in apex are located in this git repository under /scrum-ticketing/src.

Here you will find the f100.sql file, f100.zip file and schema_definition.sql file. f100.sql and f100.zip are redundant both contain the complete source code of the application, the zip file just contains them as individual files instead of in one single script.

When you want to install the application in you apex environment, you can simply import the f100.sql file and it will install everything. 

This however does not include the database objects - primarily the tables - that are needed to actually use the application. The schema_definition.sql is an sql script that creates all necessary database objects. Run this once in your apex environment and after that the imported app should work normally.

#### Installing the Sources

Once you have uploaded the schema_definition.sql file, you can click on the play symbol in the "Run" column like shown in the screenshot above.

This will run the script and install all necessary database objects. If no errors occur, everything is ready now to install the actual apex app.

This is done by clicking on "App Builder" in the top menu on the left side. It will show a screen similar to the following, just without any app icons:

![image-20230825105856156](Ticketing System Setup.assets/image-20230825105856156.png)

Here, click on "Import" and drag and drop the f100.sql file into the input field:

![image-20230825105931700](Ticketing System Setup.assets/image-20230825105931700.png)

Click "next". On the next page that comes up, click "next" again, it just informs you that the initial import (the parsing of the file) was successful. 

In the following page, you simply have to make sure that your database schema (should be named the same as your workspace) is selected and that you select "Reuse Application ID 100 From Export File":

![image-20230825110224770](Ticketing System Setup.assets/image-20230825110224770.png)

Then you can click on install application. On the next page you can click on "Edit Application" to get to the application development home screen of the app. This shows the different pages the app consists of and offers a play button to execute the app:

![image-20230825110423013](Ticketing System Setup.assets/image-20230825110423013.png)

You can also find the screen via the App Builder by clicking on the new apps name or icon that is shown there.

Clicking "Run Application" here will open a page like this:

![image-20230825110544602](Ticketing System Setup.assets/image-20230825110544602.png)

This is the page normal users should use to login to the app, and developers will use to test changes. Note that you could create two databases and two apex instances, so the developers don't have to make and test changes in the production app, but we figured this is not worth the effort for our small scale application.

The users you have to use to login into the app here are not necessarily the same as the ones you use to log in to the development environment. You can manage users from the app builder as well by clicking on the user icon in the top right and selecting manage users and groups:

![image-20230825110834609](Ticketing System Setup.assets/image-20230825110834609.png)

If there are no users available in that page, you should create one for each enduser of the application. After that go back to the app development home screen and click on "Shared Components":

![image-20230825110423013](Ticketing System Setup.assets/image-20230825110423013.png)

Here under "Security" click on "Application Access Control":

![image-20230825111149074](Ticketing System Setup.assets/image-20230825111149074.png)

There should be three roles already (if not create them) but the user role assignments is likely empty for you:

![image-20230825111243641](Ticketing System Setup.assets/image-20230825111243641.png)

Here just add a User Role Assignment via the button on the right for each user and select "Contributor" as the role for each person that is not a developer of the apex app. For developers you can use "Administrator" as the role.

After that the users should be able to log in to the application on the login screen that we've already seen:

![image-20230825110544602](Ticketing System Setup.assets/image-20230825110544602.png)

No everything should be ready to be used, you can create Projects, sprints inside the projects and tickets inside the sprints according to your needs. Getting started with acutal oracle apex development is fairly easy since it mainly UI-driven with little code to write and there are a lot of tutorials and guides available on the web alongside an active stack overflow community. However you are likely to only need to do small adjustments to the app to use it for your purposes as it is already rather well mature since we have been actively using it for over half a year now.

If there are any questions left, hit me up at scg@mail.upb.de

glhf,
Simon