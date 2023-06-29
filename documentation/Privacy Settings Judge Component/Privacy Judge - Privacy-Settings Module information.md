## Embedding the Privacy-Settings module into the Dashboard: 

An example can be found in the Spotify Dashboard where the module is already included. 

```
<div id="stepX">
	<h2 nz-typography id="Manage-Privacy">Manage-Privacy</h2>
    	<nz-card nzTitle="Privacy Settings Judge" nzHoverable>
        	<app-settings-form [service]="'Spotify'"></app-settings-form>
        </nz-card>
</div>
```

The  [service] variable defines the used service such that the correct list of Questions, options, etc. is loaded. For your corresponding service please use "Instagram" or "Facebook" respectively



## Defining the Options, Questions, etc. that are used in the module for your service

Under 

```
src\app\visualizations\all\privacy-settings-judge\spot-privacy-settings.service.ts
```

you will find an example of the Options we used for Spotify. The only relevant part of this file is the "settings" array, where:

- Question: Defines the Question you want to ask the user for this setting

- HowToCheck: Provides an explanation of where to find the setting so that the user can answer the Question. HTML can be used in this string and will be displayed in the frontend. I suggest providing a Short description like Spotify and a longer picture guide on an external link that can be used when needed by the user.

- Options: defines the Options that are available to answer the question. Each advice corresponds to the answer that is in the same row and to the question. 

  E.g. for 

  ```
  options : [
          { label: "Yes", value: "yes", advice: "No Idea if its Good" }, ]
  ```

  The advice "No Idea if its Good" will be displayed when the users selects the option "Yes" for the previously defined Question.

There can be arbitrarily many options (Too many may look bad on the dashboard) in the options array or settings with questions in the settings array. Only the sizes of the "HowToCheck" and "Advice" fields should be taken into consideration as all the text will be displayed on the dashboard
