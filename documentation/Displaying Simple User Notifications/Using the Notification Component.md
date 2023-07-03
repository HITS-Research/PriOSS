

# Using the Notification Component

Import the NotificationService in your .component.ts file. Note that the path needs to match the pass from your component.ts to the notification.component.ts file.

```typescript
import { NotificationService } from '../notification/notification.component';
```

Add the notification service to the constructor of your component:

```typescript


@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.less']
})
export class ServiceSelectionComponent 
{
    constructor(private notifyService: NotificationService)
  	{ }
    
    ...
}
```

Now you can call the methods in the notification component from within your component:

```typescript
//Show the message for 3 seconds
this.notifyService.showNotification("Please select a data-download zip-file first!", 3000);

//Show the message for 5 seconds, 5 seconds is the duration for which the message is shown
this.notifyService.showNotification("Please select a data-download zip-file first!");
```

