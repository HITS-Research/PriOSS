# Dashboard Design Guidelines

## Sections

Every Dashboard should include the accordion component as shown below:

```html
<app-accordion title="Visualization">
    <!-- Content of the section -->
</app-accordion>
```

The accordion component cann be found in the app/feature folder and ensures that the section titles are styled the same.

The id field is used to scroll the page when a menu item is clicked. Each dashboard should have sections with the following ids:

```html
"visualization"
"rectification"
"gdpr"
"purpose"
"faq"
```

## Grid based Cards

The content of each section should be different cards arranged in a responsive grid. To create the grid inside a section use this code:

```html
<div nz-row [nzGutter]="{ xs: 8, xl: 40 }">
    <div nz-col nzXs="24" nzXl="8">
		<!--card 1-->
    </div>
    <div nz-col nzXs="24" nzXl="8">
		<!--card 1-->
    </div>
    <div nz-col nzXs="24" nzXl="8">
		<!--card 1-->
    </div>
</div>
```

The nzXs refers to the size when an extra small screen is used (e.g. a Phone) while nzXl refers to the size of the element when an extra large screen (e.g. a Desktop computer is used)

The individual divs each contain one card and are automatically arranged according to the available space in the grid.

A single card can be defined like this:

```html
<app-dash-card cardLink="/spot/general-data" titleText="User Data" buttonText="Explore" buttonIcon="double-right">
  <!-- Card content -->
</app-dash-card>
```

The titleText defines the title of the card, buttonText defines the text of the button and buttonIcon defines the icon of the button. The buttonIcon can be any icon from the [Ant Design Icon Library](https://ng.ant.design/components/icon/en)
The button navigates to the page defined in the cardLink attribute.
This example shows a card with the title "User Data" that leads to the /spot/general-data page.

## Background color

The standard background color is a grey color. This should be left unchanged for the Dashboards, so the hovering effect of the cards is nicely visible.

Other pages, like a page for an individual visualization / information pages should also have a grey background for most part but it is recommended that the visualizations themselves are displayed using a white background for better contrast.



