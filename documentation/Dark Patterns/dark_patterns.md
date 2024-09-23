# Dark Patterns Component Documentation

## Overview

The Dark Patterns component is designed to raise awareness about deceptive design techniques used on websites and apps. It explains what dark patterns are and provides examples of different types through an interactive carousel. 

## Key Features

- **Informative Definition**: Clearly explains what dark patterns are and how they affect users.
- **Interactive Carousel**: Provides a visual and descriptive representation of various dark patterns.
- **Navigation Buttons**: Allows users to navigate through the carousel items easily.

## Sections

### 1. What are Dark Patterns?

This section contains a detailed definition of dark patterns:

> Dark patterns are deceptive design techniques used in websites or apps to trick users into taking actions they didn't intend. These tactics can include hiding important information, making it hard to unsubscribe, or manipulating users into buying more. Essentially, they take advantage of human behavior to benefit the business at the expense of the user’s choice or control.

### 2. Examples of Dark Patterns

This section features an interactive carousel showcasing different dark patterns. Each item in the carousel includes a title, image, and description. The following dark patterns are included:

1. **Sneak Into Basket**
   - **Description**: Websites use a sneaky tactic to add items or additional costs to your shopping cart without you realizing it.
   - **Image**: Displays an example of this dark pattern.

2. **Hidden Information**
   - **Description**: Important information and options are hidden or displayed in such a way that they are hardly noticeable to obtain your consent for increased data access.
   - **Image**: Displays an example of this dark pattern.

3. **Activity Notifications**
   - **Description**: Websites notify you with urgent messages such as "Offer ends in 5 minutes," creating a sense of pressure and scarcity to manipulate decision making.
   - **Image**: Displays an example of this dark pattern.

4. **Preselection**
   - **Description**: Some options in a webpage or a pop-up will be pre-selected or ticked to take more advantage of you and earn profit.
   - **Image**: Displays an example of this dark pattern.

5. **Forced Continuity**
   - **Description**: Some websites make it hard for you to cancel subscriptions in order to change your decision.
   - **Image**: Displays an example of this dark pattern.

6. **No Reject Button**
   - **Description**: Websites do not give you an option to reject agreements, subscriptions or policies by not providing it to have more data access about you.
   - **Image**: Displays an example of this dark pattern.

## Styling

The component is styled to enhance user experience and visibility. Key styling features include:

- **Definition Text**: Larger font size for clear readability.
- **Carousel Container**: Centrally aligned, with a light gray background, rounded corners, and a subtle shadow for depth.
- **Navigation Buttons**: Positioned at the center vertically, with a hover effect that enlarges the button to indicate interactivity.
- **Carousel Items**: Structured layout with a distinct separation between the text and image, ensuring a clean and organized appearance.

## Functionality

### Navigation

The carousel includes 'Previous' and 'Next' buttons for easy navigation. These buttons are enabled or disabled based on the current position in the carousel:

- **Previous Button**: Disabled when the carousel is at the first item.
- **Next Button**: Disabled when the carousel is at the last item.

### Carousel Content

Each carousel item displays:

- **Title**: A concise name of the dark pattern.
- **Description**: An explanation of the dark pattern.
- **Image**: A visual representation of the dark pattern.

### Interactivity

The component uses Angular's `ViewChild` to control the carousel and navigate through the items programmatically.

## Usage

To use the Dark Patterns component, simply include it in your Angular application. It is designed to be standalone and easy to integrate.

### Importing the Component

Make sure to import the `NzCarouselModule` and `CommonModule` in your module file.

### Including in a Template

Include the component in your template using its selector:

```html
<app-dark-patterns></app-dark-patterns>
