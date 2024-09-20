# Welcome Message Component Documentation

## Overview

The Welcome Message component is designed to greet users and provide an overview of the features available on the platform's dashboard. It highlights key functionalities such as data visualization, rectification, privacy recommendations, and understanding data extraction purposes.

## Key Features

- **Dynamic Greeting**: Displays a customizable welcome message and description.
- **Feature List**: Provides an overview of key dashboard functionalities with icons and descriptions.

## Sections

### Introduction

This section includes a dynamic greeting message that can be customized based on the platform and a brief description. It also lists the main features of the dashboard:

- **Visualization**: Explore what information about you is accessed by the service.
- **Rectification**: You can correct or update your data as needed.
- **Privacy Recommendations**: Learn privacy-specific improvements that can be made to your account.
- **Purposes**: Understand why services extract data about you.

## Styling

The component is styled for clarity and user-friendly presentation. Key styling features include:

- **Font and Background**: Uses Arial, sans-serif for readability and a white background for a clean look.
- **Header**: Prominent font size to highlight the welcome message.
- **Description**: Slightly smaller font size to distinguish from the header.
- **Horizontal Rule**: Light gray line to separate sections.
- **Feature List**: Icons and descriptions are aligned for easy reading and visual appeal.

## Functionality

### Dynamic Content

The welcome message and description are dynamic and can be customized through input properties.

### Feature List

Each feature is represented by an icon and a brief description to provide users with a quick overview of the available functionalities.

## Usage

To use the Welcome Message component, include it in your Angular application. It is designed to be standalone and easy to integrate.

### Importing the Component

Ensure the component is imported in your module file.

### Including in a Template

Include the component in your template using its selector:

```html
<app-welcome-msg [platform]="'Your Platform'" [description]="'Your custom description here.'"></app-welcome-msg>
