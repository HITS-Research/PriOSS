# Apex Stay Alive Check

This shows a simple setup whereby apex automatically sends of a rest-request to itself every so often, so what the oracle database and apex service are marked to be used and are not shut down due to not being used.

## Create the REST Service

Source: https://docs.oracle.com/database/apex-18.1/AEUTL/accessing-RESTful-services.htm#AEUTL-GUID-DE5D8763-A650-4FBA-9CC5-17E141C8406C

Go To "SQL Workshop" > "RESTful Services". On the left, click on "RESTful Data Services" and click "Register Schema with ORDS" on the right side.

Follow the instructions in the Dialog that comes up. WE used "prioss" as the schema alias here. This will be a part of your rest url's path.

When you have enabled the schema, click on "Modules" in the left side panel. And click "Create Module" on the right side. Enter the following info:

**Module Name**: alive
**Base Path**: /alive/
**Is Published**: Yes
**Pagination Size**: 25

Then save the new module.

This is the module afterwards. Note that we have not created the Resource Template yet that is shown in the screenshot. This is what we'll do next:

![image-20230821100900102](Apex Stay Alive Check.assets/image-20230821100900102.png)

Click on "Create Template" and enter the following information:

**URI Template**: check
**Priority**: 0
**HTTP Entity Tag Type**: Secure Hash

Save the Resource Template. This is what it should look like now. Note again that we haven't create the Resource Handler yet that is shown in the Screenshot:

![image-20230821101259853](Apex Stay Alive Check.assets/image-20230821101259853.png)

Click on "Create Handler" and enter the following information:

**Method**: Get
**Source Type**: Collection Query Item
**Source**: 

```sql
select sysdate
from dual
```

Watch out that this SQL Query does **not** have a semicolon at the end, since that can result in an error when executing the Rest Request.

Save the Handler.

You should now see the created handler and one of the shown information items "Full URL" will display the URl through which you can access your newly created rest service. Save this URL for later, we will need it in the next section. This service will then respond with the current sysdate (the current date and time) of the database.

## Creating an Automation that accesses the Rest Service

Click on "App Builder" in the top navigation bar inside your Apex Environment.

Now create a new empty app by clicking on "Create" and name it "Stay Alive".

Inisde the App go to "Shared Components" > "Workflow and Automations" > "Automations" and click "Create" to create a new automation.

Enter the following information in the Dialog that comes up.

![image-20230821102223404](Apex Stay Alive Check.assets/image-20230821102223404.png)

This will create an automation that executes every 6 hours. The following screen showing the created automation will come up:

![image-20230821102342529](Apex Stay Alive Check.assets/image-20230821102342529.png)

Click on the pencil Icon next to "New Action" in the "Actions" Table. The following screen will come up. Enter the information like shown in the screenshot:

![image-20230821102754752](Apex Stay Alive Check.assets/image-20230821102754752.png)

Here is the code that is shown above (for copying):

```plsql
declare
	v_res_clob clob;
begin
    v_res_clob := apex_web_service.make_rest_request(
        p_url => '<your rest service url from above>',
        p_http_method => 'GET'
    );

    APEX_AUTOMATION.LOG_INFO(v_res_clob);
end;
```

As the "p_url" parameter you have to pass your rest service url that you copied above.

You can then hit "Apply Changes" to save your automation's action.

In the automation screen that you'll be returned to, click "Save and Run" and then go back to "Shared Components" > "Automations".

Here you will see your new automation "Check Aliveness" with a date on which it was last run (which should be more or less the moment that you hit "Save and Run" before. Note that there can be timezone differences between the DB Server and your local time:

![image-20230821103053258](Apex Stay Alive Check.assets/image-20230821103053258.png)

Now you can click on "Execution Log" and in the list, click on the "1" that is displayed in the "Messages" column on the right.

![image-20230821103159755](Apex Stay Alive Check.assets/image-20230821103159755.png)

The messages output by the automation should be shown similar to the following screenshot:

![image-20230821103300668](Apex Stay Alive Check.assets/image-20230821103300668.png)

If this json message includes a "sysdate" with some valid date assigned to it, the automation works as it should. Otherwise there will be some error information contained in this json message.