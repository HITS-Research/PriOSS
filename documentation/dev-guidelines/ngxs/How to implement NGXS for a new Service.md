# How to implement NGXS for a new Service
In this document, i will explain one way to implement NGXS for this project.
So lets assume, we have a new Service, e.g. Youtube. 

At first, we have to get the userdata from Youtube in Form of JSON files. Then we have to perform 4 Steps to have a runnig service depending on NGXS.

1. Create interfaces for every JSON file
2. Create datastores for the service
3. Load the data into the datastores
4. Use the data in components/pages

## 1. Create interfaces for every JSON file
Create a directory `models` in your service subdirectory.

Then you can create an interface file for every json file, that you want to parse.
It has to be Typescript files, so end the filename with `.ts`

__Tip__: You can do it fast with the command line:
```
#On windows systems with Powershell
cd <path_to_your_service>/models
New-Item AccountActivity.ts, BlaBla.ts, xyz.ts

# on linux based systems
cd <path_to_your_service>/models
touch  AccountActivity.ts, BlaBla.ts, xyz.ts
```

It is crucial to implement a correct interface for the JSON structure. If the interface is not correct, it will make parsing unnecessariliy hard.

What do i mean by that. Lets take a look at the following JSON structure:
```json
{
    "off_facebook_activity_v2": [
      {
        "name": "ebay.de",
        "events": [
          {
            "id": 111111111111111,
            "type": "PURCHASE",
            "timestamp": 1698272460
          }
        ]
      }
    ]
  }
```

This is a JSON file, that Facebook created to show, what they track on sites and websites off of Facebook.

#### Wrong approach
Our first thought may be to just flatten the structure and implement the interface like this:
```typescript
export interface OffFacebookActivityModel {
  name: string;
  events: string;
  type: string;
}
```
This only extracts the data, that the developer needed at the time. This is wrong, as it not only blocks parsing the json file with one line of code: `JSON.parse(jsondata)`, it does not reflect the structure correctly, as `type` is as key in an object in the list `events` and not on the same hierarchy level as `events`.

#### Correct approach
There are two ways to write the interface. We can do it explicit or implicit. For this documentation, i will only do it explicitly and would advise you to do the same, as it makes the code clearer.

```typescript
/**
    "off_facebook_activity_v2": [
      {
        "name": "ebay.de",
        "events": [
          {
            "id": 111111111111111,
            "type": "PURCHASE",
            "timestamp": 1698272460
          }
        ]
      }
    ]
  }
*/
export interface OffFacebookActivityModel {
  off_facebook_activity_v2: OffFacebookActivityItem[];
}
export interface OffFacebookActivityItem {
  name: string;
  events: Events[];
}
export interface Events {
  id: number;
  type: string;
  timestamp: number;
}
```
The first thing we do, is to add the JSON structure as a comment to the interface. This will show uop as a tooltip, when hovering over an implementation of the interface
![Alt text](json_comment_for_interface_hover.png)

This will be helpful for using the interface.

Then we create one interface for each JSON object in the structure.

__Tip__: Create a github student account to get access to Github Copilot and use the Copilot in Visual Studio Code. If you write the JSON structure as a comment, Copilot will pick up on it and do almost all the work for you and create the correct interfaces.

__Tip__: Create a file `index.ts` in the `models` folder, where you export all your interfaces, so the import statements in the datastores can be organized neatly and you will have some other benefits. Read this, if you want to know more: https://itnext.io/better-typescript-module-organization-824562865aaa


## 2. Create the datastores for your service
So now you have all interfaces ready, we can get to NGXS.
Maybe visit the website and read the introduction and docs to get an overview, how it works, as i will explain it only briefly here.

In NGXS you have one datastore for your whole application (PriOSS in our case). This datastore can contain other datastores, in our case one datastore for each service. You can add more datastores in the datastore for your service. For example, you have profile data, like name, birthdate etc and you have data relevant to ads. so you create one store each for profile data and for ads data. How many datastores and which subdivision you do, is for you to decide. 

### 2.1 Create the files and folders for NGXS
During the following part, i will use YouTube as an example service.

In your project folder create a new folder `state` and `state/models`. In `state/models` we will put all Datastores for our service. 

A Datastore is just a exportable typescript interface.  

At first, we only created two Datastores, one for our Userdata and one for the State, so switch to `state/models` and create new files `youtube-user-data-model.interface.ts` and `youtube-state-model.interface.ts`.
Lets just create the skeleton for The Userdata store and add the sub datastores later:

Edit `youtube-user-data-model.interface.ts` and add the following:
```typescript
export default interface YoutubeUserDataModel {
  //we will later add datastores for the json data
}
```
Then edit `youtube-state-model.interface.ts` and add the following:
```typescript
import { YoutubeUserDataModel } from '.';
export default interface YoutubeStateModel {
  user_data: YoutubeUserDataModel[];
}
```
You just created the datastore for the State: `YoutubeStateModel`. It just contains a list of `YoutubeUserDataModel`. Why a list? Because we want to preserve the option to compare multiple data exports from  
Youtube.

Okay, thats it for datastoremodels for now. Lets create the State for the Service.
In `state` create three files:

`youtube.action.ts`

`youtube.state.spec.ts`

`youtube.state.ts`

Edit `youtube.action.ts` and add the following content:
```typescript
import { YoutubeUserDataModel } from './models';

export class ResetYoutubeUserData {
  static readonly type = '[Youtube] Reset User';
  constructor() {}
}

export class UpdateYoutubeUserData {
  static readonly type = '[Youtube] Update User';
  constructor(public userData: YoutubeUserDataModel) {}
}
```

Edit `youtube.state.ts` and first add this:
```typescript
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ResetYoutubeUserData } from './fb.action';

@State<YoutubeStateModel>({
  name: 'youtube',
  defaults: { user_data: [] },
})
@Injectable()
export class YoutubeState {
  constructor() {}

  @Action(ResetYoutubeUserData)
  resetUser(ctx: StateContext<YoutubeStateModel>) {
    ctx.setState({} as YoutubeStateModel);
  }
}
```

The file `youtube.spec.ts` stays empty.

Now we have a basic structure for our data. Its time to create and add our sub datastores to the `YoutubeUserDataModel`.

Create a new file for every sub datastore, that you use. You can, for example, create datastores based on the folder structure of the Youtube data. So, if there is a folder `Profile` and `Advertising` you can create Datastores `YoutubeProfileDataModel` and `YoutubeAdvertisingDataModel` and put all interfaces in the store, that are based on JSON files in the folder. Feel free to structure your interfaces in the datastores as convieniently as possible, but remember to document your thought process. 

But how do we add the interfaces to the datastores?
Well, its just another layer of interfaces. Take for example the `YoutubePreferencesModel`:
```typescript
import {
  DevicePushSettingsModel,
  LanguageAndLocalesModel,
  VideoPreferenceModel,
} from '../../models';
export default interface YoutubePreferencesDataModel {
  devicePushSettings: DevicePushSettingsModel;
  languageAndLocales: LanguageAndLocalesModel;
  videoPreferences: VideoPreferenceModel;
}
```
As you can see, we just import the interfaces, that we created in the first step and add them to the datastore/interface `YoutubePreferencesDataModelInterface`. You can see the usefulness of the `index.ts` file in `models`, as we do not need to specify the path for each import and can group them.

Create all the datastores.

Okay, we finally created all the datastores. Now we need to make sure, that our main application knows the store for our service. For that, we need to edit the state of the application. So switch to the folder `src/app/state`
and add your state `YoutubeState` to the children of the main State model:
```typescript
@State<AppStateModel>({
  name: 'PriOSS',
  defaults: {},
  children: [InstaState, FacebookState, SpotifyState, YoutubeState],
})
```

You may ask yourself now: how do i access the data?
For that, we need to add Getters, which are methods decorated with `Selector` to our State.
Edit the file `youtube.state.ts` and add a Getter for each datastore like in the class `YoutubeState` like this:
```typescript
@Injectable()
export class FacebookState {
  constructor() {}

  @Action(ResetFbUserData)
  resetUser(ctx: StateContext<FacebookStateModel>) {
    ctx.setState({} as FacebookStateModel);
  }

  @Selector()
  static getYoutubeUserData(state: YoutubeStateModel) :YoutubeUserDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1];
    } else {
      return {} as YoutubeUserDataModel;
    }
  }

    @Selector()
  static getYoutubeAdsInformationData( state: YoutubeStateModel): YoutubeAdsInformationModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1].ads_and_businesses;
    } else {
      return {} as YoutubeAdsInformationModel;
    }
  }
}
``` 
Do that for every store you have.

Thats it, you have successfully implemented the NGXS datastores.
Now its time to fill them up with data!

## 3. Load JSON data into NGXS datastores
Inside the function that loads the zip file with the users data you need to fill the store with the extracted data.

First you need to instantiate the UserDatModel
```typescript
    const userData: YoutubeUserDataModel = {} as YoutubeUserDataModel;
```

If you have any "sub-stores" you need to instaniate those as well
```typescript
    // initialize sub-stores
    userData.activity_across_youtube= {} as YoutubeActivityAcrossYoutubeModel;
    userData.logged_information= {} as YoutubeLoggedInformationModel;
```

Afterwards when loading your files you can parse the JSON file directly into the respective store
```typescript
      const content: string = await zip.files[filepath].async('string');

      ...
      
      if (filename === 'your_topics.json') {
        const inferredTopics: InferredTopicsModel = JSON.parse(content);
        userData.logged_information.inferred_topics = inferredTopics;
      } else if ...
```

When the UserDataModel is filled you need to dispatch it into the store
```typescript
    this.store.dispatch(new UpdateFbUserData(userData));
```
## 4. Use the data in your components
Using the data is the easy part.

Lets assume, you have a component for all data related to youtube ads. We can just inject the datastore, that we need, as a private variable to the class and use it however we want. 
```typescript
export class AdsRelatedDataComponent implements OnInit {
      constructor( private store: Store) {
        super();
    }
    userData = this.store.selectSnapshot(YoutubeState.getUserData)
    adsRelatedData = userData.ads_and_businesses
  //... rest of the class
}
```