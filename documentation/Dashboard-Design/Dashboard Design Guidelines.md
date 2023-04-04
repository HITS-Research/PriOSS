# Dashboard Design Guidelines

## Sections

Every Dashboard should include the following Sections:

```html
<h2 nz-typography id="rectification">Rectification</h2>
<h2 nz-typography id="gdpr">Your Rights under GDPR</h2>
<h2 nz-typography id="purpose">Purposes for Data Collection</h2>
<h2 nz-typography id="faq">Frequently Asked Questions</h2>
```

Use nz-typography on text-elements to ensure the correct font is used.

Category headers must be h2, you can create subcategories with smaller heading-levels as you see fit.

The id-attribute is used to enable scrolling on the page to the respective heading by clicking on certain Items from the navigation menu.

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
<a routerLink="/spot/listening-time">
	<nz-card nzTitle="Listening Time" nzHoverable>
        <!--Your component that defines how the card'S content should look-->
	</nz-card>
</a>
```

The routerLink makes the whole card clickable and defines the component page that is navigated to on click.

This example shows a card with the title "Listening Time" that leads to the /spot/listening-time page.

## Background color

The standard background color is a grey color. This should be left unchanged for the Dashboards, so the hovering effect of the cards is nicely visible.

Other pages, like a page for an individual visualization / information pages should have a white background color with a grey outline to offset the main page content from the navigation bar at the top & side-menu. This can be achieved by going inside the html file of the component that defines your page and wrapping the whole content of the file in a \<div> and assigning the css class component-page to it, like shown here for the landing page component:

```html
<div class="component-page"><!--This & the very last line are the cruicial lines. The rest is just the content of the landing page-->

   <div class="t-title">
      <div class="t-main-logo">
         <img src="/assets/images/icons/prioss_icon.png" alt="logo">   
      </div>  
      <h1>PriOSS: The Privacy One Stop Shop</h1>
      <p class="t-sub-title">Your. Easy. Privacy.</p>   
   </div>
   
   <div class="t-v-spacer"></div>

   <div class="t-text-container"> 
      <p>This website helps you exercise your privacy rights in regards to your personal data that services like
         Instagram, Spotify and Facebook collect.</p>
      <div class="t-v-paragraph-spacer"></div>
      <p>See what data they have collected about you without having to send any personal data across the internet.</p>
   </div>   

   <div class="t-v-spacer"></div>

   <div class="t-explore-btn-click-space" (click)="goToServiceSelection()">
      <button  class="btn btn-outline-secondary btn-lg">Explore</button>
      <fa-icon class="t-icon-explore-chevron" [icon]="faChevronDown"></fa-icon>
   </div>
   
</div>
```

