# Commenting

The commenting guidelines are based on the typescript documentation project tsdoc (https://tsdoc.org/).

In typescript (.ts files) you have to comment methods / functions and component-classes with a comment that adheres to the following style.

## Components

All components have to be commented. Such a comment should look like this:

```typescript
import { Component } from '@angular/core';

/**
  * This component is the root component for spotify's dashboard page.
  * This page is shown once a user has successfully uploaded their spotify data-download.
  *
  * @remarks
  * Equivalent components for facebook and instagram exist that define their dashboards
  *
  * @authors: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
@Component({
  selector: 'app-spot-dashboard',
  templateUrl: './spot-dashboard.component.html',
  styleUrls: ['./spot-dashboard.component.less']
})
export class SpotDashboardComponent {
	[...]
}

```



## Methods / Functions

All methods and functions have to be commented. Such a comment should look like this:

```typescript
export class Statistics {
/**
  * Returns the average of two numbers.
  *
  * @remarks
  * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
  *
  * @param x - The first input number
  * @param y - The second input number
  * @returns The arithmetic mean of `x` and `y`
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
  public static getAverage(x: number, y: number): number {
    return (x + y) / 2.0;
  }
}
```

The first line contains the begin-comment delimiter ( /**).
Write the first sentence as a short summary of the method, as Javadoc automatically places it in the method summary table (and index).
If you have more than one paragraph in the doc comment, separate the paragraphs with a paragraph tag, like so:

```typescript
/** Returns the average of two numbers.
  *  <p>
  *  And some more mysterious things...
  * 
  * @remarks
  * [...]
```

Insert a blank comment line between the description and the list of tags.
The first line that begins with an "@" character ends the description. There is only one description block per doc comment; you cannot continue the description following block tags.
The last line contains the end-comment delimiter ( */) Note that unlike the begin-comment delimiter, the end-comment contains only a single asterisk.

When you describe parameters, make sure that it is clear what kind of values are expected/allowed here, for example the unit in which a number should be given (cm? m? km?).