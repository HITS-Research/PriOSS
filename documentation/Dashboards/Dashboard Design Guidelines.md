# Dashboard Design Guidelines

## Sections

Every Dashboard should include collapsible section using the better shown below:

```html
<details open id="visualization">
    <summary class="collapsible-dashboard-section-title">Your Data</summary>
    <!-- Content of the section -->
</details>
```

The collapsible-dashboard-section-title CSS class is defined in the global styles.less and ensures the section titles are styled the same.

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
<app-dash-card cardLink="/spot/general-data" titleText="User Data" 
            tooltipText="This card shows your general user data like your email, gender, postal address etc. Click to find out 								more.">
  <!-- Card content -->
</app-dash-card>
```

The cardLink makes the whole card clickable and defines the component page that is navigated to on click.

This example shows a card with the title "User Data" that leads to the /spot/general-data page. It also defines a tooltip that is displayed when the user hovers hover the question mark icon in the upper right corner of the card

## Background color

The standard background color is a grey color. This should be left unchanged for the Dashboards, so the hovering effect of the cards is nicely visible.

Other pages, like a page for an individual visualization / information pages should also have a grey background for most part but it is recommended that the visualizations themselves are displayed using a white background for better contrast.



