# Sequential Dashboard Component Initialization

When too many more or less simultaneous requests reach the SQLite Database, some of them may fail to establish a database connection. This means that a dashboard likely cannot initialize all its components at the same time as some of the visualizations won't receive any data & break.

This is a description of an abstract system that enables a dashboard to ensure that its components are initialized sequentially, one after the other.

The system is based around two abstract classes, BaseDashboard and SequenceComponentInit.

## BaseDashboard class

The dashboard extends from the BaseDashboard class. This abstract class enables the dashboard to receive notifications from its components when they are done initializing and initialize the subsequent component.

Most of this is handled in the BaseDashboard class directly. The concrete dashboard only needs to tell the BaseDashboard which of its subcomponents need to be initialized.

To do this, we look at the example of the SpotifyDashboard. First it needs to extend the BaseDashboard class:

```typescript
export class SpotDashboardComponent extends BaseDashboard {
  ...
}
```

Then the Dashboard needs to retrieve references to its child components that need to be initialized sequentially:

```typescript
  @ViewChild(GeneralDataComponent) spotGeneralData : GeneralDataComponent;
  @ViewChild(InferencesComponent) spotInferences : InferencesComponent;
  ...
  @ViewChild(TopSongsComponent) spotTopSongs : TopSongsComponent;
```

Each of these lines gets one reference to a child component of the given class that is a part of the dashboard. These variables are available when the dashboard component's lifecycle callback ngAfterViewInit is called.

TO start the initialization, this lifecycle method has to be implemented in the dashboard:

```typescript
 ngAfterViewInit(): void  {
    //Component initialization
    //Add components to component Initialization list from BaseDashboard
    this.componentInitializationList = [];
    this.componentInitializationList.push(this.spotGeneralData);
    this.componentInitializationList.push(this.spotInferences);
    ...
    this.componentInitializationList.push(this.spotTopSongs);
    //Start Component Initialization run
    this.startSequentialInitialization();
  }
```

In this callback, the componentInitializationList variable inherited from the BaseDashboard class is filled with the references to the child components that need to be initialized. Then the first component is initialized by calling the `startSequentialInitialization()` method inherited from the BaseDashboard class. The initialization of the subsequent components in the list will be handled by the individual component classes and their SequentialComponentInit base class.

## SequentialComponentInit class

All components that should be initialized sequential have to implement this base class. Look at the `inferences.component.ts` as an example.

Each concrete component has to extend the SequentialComponentInit class:

`export class InferencesComponent extends SequenceComponentInit {`

...and override the initComponent method:

```typescript
override async initComponent(): Promise<void> {
    let inferences = await this.inferencesRepo.getAllInferences();

    this.inferences = inferences;
    this.listOfInferences = [...this.inferences];
}
```

This method should execute the necessary SQL queries via the respective repository. It MUST be implemented as `async`, so it can internally use the `await` keyword. This is needed, so the repository calls can be made synchronously via `await`. After this method ends, the next component will start its initialization. If the calls are executed asynchronously, the method ends to early and this component's SQL queries may interfere with the next one's.

It is important to understand that, when incorporated into a dashboard, this initialization method will be called automatically if the component is in the initialization list (see above) of the dashboard. If the component is shown on a dedicated page, it has to be called manually in `ngAfterViewInit`. Whether the component is on a dashboard or not can be specified by using a previewMode variable:

```typescript
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }
```

This variable needs to be defined as an Input, so it can be set via html:

```typescript
@Input()
previewMode: boolean = false;
```

When incorporated into a dashboard this variable has to be set to true in html inside the component tag:

```html
<spot-inferences [previewMode]="true"></spot-inferences>
```
