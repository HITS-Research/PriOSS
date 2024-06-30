# How to implement IndexedDB for a new Service
## Why should I use IndexedDB?
We previously used NGXS for State Management. NGXS is working really well, but it depends on Local Storage. Local Storage has a default size limit of 5 MB, which is not enough, if you want to load all data from a data export. If you try anyways, the data is lost on page reload and you can import it again on every page reload.

IndexedDB allows to store up to 10 GB in the Browser and persists data until you delete it explicitly or clear all data for the site. Also it works asynchronous, so it doesnt block the functionality of the page, while loading your data.

## Okay, so how do I implement it then?
There are multiple Steps involved:
1. Prepare the Interfaces for your data files
2. Extend IndexedDB with your service
3. Use IndexedDB in your Components

### 1. Prepare the Interfaces
The data export has many JSON Files. To make loading and using theses files easy, we need to create an interface for each of these files.

__Tip__: You can use the VS Code Extension [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype) for this task.
Just paste the JSON data and select TypeScript as Output and it will generate a correct Interface for the data.



Create a directory `models` in your service subdirectory.

Then you can create an interface file for every json file, that you want to parse.
It has to be Typescript files, so end the filename with `interface.ts`

__Tip__: You can do it fast with the command line:
```
#On windows systems with Powershell
cd <path_to_your_service>/models
New-Item AccountActivity.interface.ts, BlaBla.interface.ts, xyz.interface.ts

# on linux based systems
cd <path_to_your_service>/models
touch  AccountActivity.interface.ts, BlaBla.interface.ts, xyz.interface.ts
```

It is crucial to implement a correct interface for the JSON structure. If the interface is not correct, it will make parsing unnecessarily hard.

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
This only extracts the data, that the developer needed at the time. This is wrong, as it not only blocks parsing the json file with one line of code: `const offFacebookActivity: OffFacebookActivityModel = JSON.parse(jsondata)`, it does not reflect the structure correctly, as `type` is as key in an object in the list `events` and not on the same hierarchy level as `events`. You would have to map each value in the JSON file manually to the interface instead of leaving the work to `JSON.parse()`

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
The first thing we do, is to add the JSON structure as a comment to the interface. This will show up as a tooltip, when hovering over an implementation of the interface
![Alt text](json_comment_for_interface_hover.png)

This will be helpful for using the interface.

Do this for every JSON file, that is in the data export.

### 1.2. Create the datastores for your service
So now you have all interfaces ready, we can bundle them up for easier access.

We want to have one datastore for your service (Facebook in our case). This datastore can contain other datastores, which are basically just collections of interfaces for your json data. You can add more datastores in the datastore for your service. For example, you have profile data, like name, birthdate etc and you have data relevant to ads. so you create one store each for profile data and for ads data. How many datastores and which subdivision you do, is for you to decide. 

__Tip__: Create a file `index.ts` in the `models` folder, where you export all your interfaces, so the import statements in the datastores can be organized neatly and you will have some other benefits. Read this, if you want to know more: https://itnext.io/better-typescript-module-organization-824562865aaa

### 2.1 Create the files and folders for the Interfaces

In your project folder create a new folder `state` and `state/models`. In `state/models` we will put all Datastores for our service. 

A Datastore is just a exportable typescript interface.  

At first, we only create one Datastore for our Userdata.
Lets just create the skeleton for The Userdata store and add the sub datastores later:

Edit `Facebook-user-data-model.interface.ts` and add the following:
```typescript
export default interface FacebookUserDataModel {
  //we will later add datastores for the json data
}
```

Now we have a basic structure for our data. Its time to create and add our sub datastores to the `FacebookUserDataModel`.

Create a new file for every sub datastore, that you use. You can, for example, create datastores based on the folder structure of the Facebook data. So, if there is a folder `Profile` and `Advertising` in your data export, you can create Datastores `FacebookProfileDataModel` and `FacebookAdvertisingDataModel` and put all interfaces in the store, that are based on JSON files in the corresponding folder. Feel free to structure your interfaces in the datastores as convieniently as possible, but remember to document your thought process. 

But how do we add the interfaces to the datastores?

Well, its just another layer of interfaces. Take for example the `FacebookPreferencesModel`:
```typescript
import {
  DevicePushSettingsModel,
  LanguageAndLocalesModel,
  VideoPreferenceModel,
} from '../../models';
export default interface FacebookPreferencesDataModel {
  devicePushSettings: DevicePushSettingsModel;
  languageAndLocales: LanguageAndLocalesModel;
  videoPreferences: VideoPreferenceModel;
}
```
As you can see, we just import the interfaces, that we created in the first step and add them to the datastore/interface `FacebookPreferencesDataModelInterface`. You can see the usefulness of the `index.ts` file in `models`, as we do not need to specify the path for each import and can group them.

Create all the datastores.

After you created all sub datastores, you can add the to your main store `FacebookUserDataModel`

```typescript
export default interface FacebookUserDataModel {
  preferences: FacebookPreferencesDataModel,
  advertiserData: FacebookAdvertiserDataModel,
  ...
  activity: FacebookActivityDataModel
}
```

Now, if you want to use it, you can load and traverse the `FacebookUserDataModel`.
For example, you want to access the `devicePushSettings`.
```typescript
...
const userData: FacebookUserDataModel = somehow_load_data_we_will_get_to_that_later;
const devicePushSettings = userData.preferences.devicePushSettings;
...

```

### 2. Extend IndexedDB with your service
I will take the service Facebook as an example throughout this section.

After we created a UserDataModel for all our JSON data, we need to wrap it up even further, because we need some metadata, like the data export filename, the size of the data export and the timestamp, when the file was loaded.

So lets create a Wrapper for it and store it under `facebook/models`.
We create an Interface with the following structure:
```typescript
import { FacebookUserDataModel } from "../state/models";

export interface FacebookDataFile {
    timestamp: number;
    filename: string;
    sizeInBytes?: number;
    data: FacebookUserDataModel;
}
```

Now we have everything together to extend the IndexedDB.

We need to do the following steps:
1. Extend our Database Schema
2. create methods to write and read data to and from our database.

#### 2.1 Extend our Database Schema
Edit `src/app/state/indexeddb.state.ts` and add your service, in this example Facebook to the DB. Also add the service to __ServiceName__ so we can prevent typos when using the name of the service.

You see the interface __PriossDB__ and the enum __ServiceName__
```typescript
interface PriossDB extends DBSchema {
  selectedService: {
    key: 'selectedService',
    value: SelectedService,
    keyPath: 'filename',
    indexes: { 'by-filename': string }
  }
  facebook: {
    key: 'facebook',
    value: FacebookDataFile,
    keyPath: 'filename',
    indexes: { 'by-filename': string }
  }

  instagram: {
    key: 'instagram',
    value: InstaUserDataModel,
    indexes: { 'by-name': string }
  }
}
enum ServiceName {
  facebook = 'facebook',
  instagram = 'instagram',
  selectedService = 'selectedService',
}
```

You need to add a "table" to the database, which is basically just a key:value pair. The keyPath specifies the primary key, you can also add an index.
But be cautious; Only use indexes for textual data, it will be reaaaaaally slow for blobs like images and videos.

Okay, the database is updated, but what happens, if a client already has accessed our web app and has an old Database Schema in his browser storage?
For this case, we have database versioning.

Edit the Method `createDb` and increase the Version number by 1. add a new case to the switch statement and add the steps, that are needed for an database upgrade.

Lets say, we have database version 2 (dont ask, why it starts with 2, i was stupid) and already added instagram. now we need to bump the version to 3 and add facebook to it:

Before:
```typescript
  async createDb() {
    const db: IDBPDatabase<PriossDB> = await openDB<PriossDB>('prioss-db', 2, {
      upgrade(db: IDBPDatabase<PriossDB>, oldVersion: number) {
        switch (oldVersion) {
          //we intentionally do not use break, because we want to go through all cases in a upgrade!
          
            // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
            case 2: {
            const instagramStore = db.createObjectStore(ServiceName.instagram, {
              keyPath: 'filename'
            });
            instagramStore.createIndex('by-filename', 'filename');

            const serviceSelectionStore = db.createObjectStore(ServiceName.selectedService, {
              keyPath: 'filename'
            });
            serviceSelectionStore.createIndex('by-filename', 'filename');
          }
          // eslint-disable-next-line no-fallthrough
        }

      }
    });
    return db;
  }
```

After:
```typescript
  async createDb() {
    const db: IDBPDatabase<PriossDB> = await openDB<PriossDB>('prioss-db', 3, {
      upgrade(db: IDBPDatabase<PriossDB>, oldVersion: number) {
        switch (oldVersion) {
          //we intentionally do not use break, because we want to go through all cases in a upgrade!
          
            // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
            case 2: {
            const instagramStore = db.createObjectStore(ServiceName.instagram, {
              keyPath: 'filename'
            });
            instagramStore.createIndex('by-filename', 'filename');

            const serviceSelectionStore = db.createObjectStore(ServiceName.selectedService, {
              keyPath: 'filename'
            });
            serviceSelectionStore.createIndex('by-filename', 'filename');
            
          }
          // eslint-disable-next-line no-fallthrough
          case 3:{
            const facebookStore = db.createObjectStore(ServiceName.facebook, {
              keyPath: 'filename'
            });
            facebookStore.createIndex('by-filename', 'filename');
          }
        }

      }
    });
    return db;
  }
```

So now we have upgraded our database and all clients are happy and nothing breaks. 
We can start to implement methods to write and read into our store.
You can add methods however you want, but i would propose to implement the following:

A Method to add Data to the DB:
```typescript
  /**
   * adds the selected Dataexportfile to the facebook store
   * 
   * @param datafile the facebook data file
   */
  async addFacebookUserDataStore(datafile: FacebookDataFile) {
    await this.waitForDb();
    const userstoreId = await this.db.put(ServiceName.facebook, datafile);
    return userstoreId;
  }
```

A Method to set the Service as the Selected Service:
```typescript
  /**
   * set the selected service to facebook
   * Just a wrapper for setSelectedServiceStore(ServiceName.facebook, filename)
   * 
   * @param filename the selected Dataexportfile
   */
  async setSelectedFacebookDataStore(filename: string) {
    await this.waitForDb();
    await this.setSelectedServiceStore(ServiceName.facebook, filename);
  }
```


A Method to delete the data export file from the IndexedDB:
```typescript
  /**
   * deletes the facebook data store by filename,
   * this is just a wrapper for deleteUserDataStore(ServiceName.facebook, filename)
   * @param filename the filename of the facebook data store
   */
  async deleteFacebookUserDataStore(filename: string): Promise<void> {
    await this.waitForDb().then(() => {
      this.deleteUserDataStore(ServiceName.facebook, filename);
    });

  }
```

A Method to get a specific Data export file:
```typescript
  /**
   * If you want to load a specific facebook data store by filename, you can use this function
   * is useful, when the user has already explored some data exports of the same service and wants to load them again
   * @param filename 
   * @returns the facebook data store
   */
  async getFacebookUserDataStoreByFilename(filename: string): Promise<FacebookDataFile> {
    await this.waitForDb();
    const stores: FacebookDataFile[] = await this.db.getAll(ServiceName.facebook);
    return stores.find(store => store.filename === filename) ?? {} as FacebookDataFile;
  }
```

A Method to get all data export files as a list:
```typescript
  /**
   * If we want to list all facebook data stores, we can use this function
   * @returns all facebook data stores
   */
  async getAllFacebookUserDataStores(): Promise<FacebookDataFile[]> {
    await this.waitForDb();
    const stores: FacebookDataFile[] = await this.db.getAll(ServiceName.facebook);
    return stores;
  }
```

A Method to get the selected data export file:
```typescript
  /**
   * This function will be used the most in components, because it returns the selected facebook data store
   * @returns the selected facebook data store
   */
  async getSelectedFacebookDataStore() {
    await this.waitForDb();
    const selService = await this.getSelectedService();
    if (selService) {
      return this.getFacebookUserDataStoreByFilename(selService.filename);
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      console.log('no selected service found');
      return {} as FacebookDataFile;
    }
  }
```


If you think a database operation is missing, you can just add it.

## How to load Data into IndexedDB
Open `ServiceSelection`

draw the rest of the fucking owl

## How to use IndexedDB in a Component

Add IndexedDB to the constructor:
```typescript
import {IndexedDbService} from '../../state/indexed-db.state'
...
	constructor(private indexedDB: IndexedDbService) {}
...
```
Load the data:
```typescript
...

 loading = signal<boolean>(true);
 userData = signal<FacebookUserDataModel>({} as FacebookUserDataModel);
 
 async ngOnInit() {
    await this.db.getSelectedFacebookDataStore()
    .then((data) => {
      this.userData.set(data.data);
    }).finally(() => {
      this.loading.set(false)
    });
 }

...
```
We have to use a loading variable, because we load the data asynchronously, so we can use a [skeleton](https://ng.ant.design/components/skeleton/en) to indicate loading.