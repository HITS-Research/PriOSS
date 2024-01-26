# Chart Component

## Examples
![Image of the examples-charts](chart-component.png)

The code in the same order as in the image.
```html
  <prioss-chart
    chartType="bar"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="doughnut"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="radar"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />
  
  <prioss-chart
    chartType="polarArea"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="bar"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="line"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="bar"
    mainAxis="y"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />

  <prioss-chart
    chartType="line"
    mainAxis="y"
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />
  
  <prioss-chart
    [datasource]="[
      { type: 'line', label: 'age', data: [30, 20, 23, 25, 19]},
      { type: 'bar', label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
  />
```

## Info
To set the size of the chart, use something like in the following example. It's important to set the display-property to some block-type to adjust the size.
```html
  <prioss-chart
    class="top-songs-chart"
    ...
  />
```
```scss
.top-songs-chart {
  display: block;
  width: 100%;
  height: 100%;
}
```

## Parameter
### Input-Parameters
- **datasource (required)**: The data which will be displayed.
```typescript
data: PriossChartDataset[] = [
  { label: 'age', data: [30, 20, 23, 25, 19]},
  { label: 'weight:', data: [81, 76, 69, 65, 75]}
]
```

- **labels (required)**: The labels for each datapoint in each dataset in the datasource.
```typescript
labels: string[] = ['Sven', 'Max', 'Bob', 'Alice', 'Tessa'];
```

- **chartType**: The global chart-type of all datasets in the datasource. Can be overwritten by `type` in the dataset. Default is 'bar'.

- **mainaxis**: The main axis of non-radial and non-round charts.

- **valueAxisMin**: The minimum displayed value on the value-axis.

- **valueAxisMax**: The maximum displayed value on the value-axis.

- **valueAxisStepSize**: The size of the steps between min and max on the value-axis.

### Output-Parameters
- **chartClick**: An event which will be emitted, when the user clicks on a datapoint. The type of `$event` is `PriossChartEvent`.
```html
  <prioss-chart
    [datasource]="datasource"
    [labels]="labels"
    (chartClick)="processClickEvent()"
  />
```

```typescript
processClickEvent(event: PriossChartEvent) {
  console.log(`The ${event.datasetLabel} of ${event.axisLabel} is ${event.value}.`);
}
```

- **chartHover**: An event which will be emitted, when the user hovers over a datapoint. The type of `$event` is `PriossChartEvent`.
```html
  <prioss-chart
    [datasource]="[
      { label: 'age', data: [30, 20, 23, 25, 19]},
      { label: 'weight:', data: [81, 76, 69, 65, 75]}
    ]"
    [labels]="['Sven', 'Max', 'Bob', 'Alice', 'Tessa']"
    (chartHover)="processHoverEvent($event)"
  />
```

```typescript
processHoverEvent(event: PriossChartEvent) {
  console.log(`The ${event.datasetLabel} of ${event.axisLabel} is ${event.value}.`);
}
```
