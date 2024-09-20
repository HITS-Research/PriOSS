# GDPR Feature Documentation

## Overview

The GDPR (General Data Protection Regulation) feature provides users with an overview of their rights under GDPR. It includes a summary of the key rights individuals have regarding their personal data and presents them in a visually organized format.

## Feature Description

The GDPR component displays information about the rights individuals have under the GDPR. It showcases these rights in a card-based layout, where each card represents a specific right with an icon, title, and description.

### Key Points

1. **Consent**: Companies must obtain explicit and informed consent from individuals to collect, process, and store their personal data.
2. **Right to Access**: Individuals have the right to access their personal data that has been collected and stored by companies.
3. **Right to Rectification**: Individuals have the right to have their personal data corrected if it is inaccurate or incomplete.
4. **Right to be Forgotten**: Individuals have the right to request the deletion of their personal data.
5. **Right to Data Portability**: Individuals have the right to receive their personal data in a format that is easily transferable to another company.
6. **Right to Object**: Individuals have the right to object to the processing of their personal data in certain circumstances.
7. **Data Breach Notification**: Companies must notify individuals and the relevant authorities within 72 hours of a data breach.
8. **Rights Related to Automated Decision-Making**: Individuals have the right not to be subject to a decision based solely on automated processing, including profiling.

## Implementation

### Structure

- **HTML**: The structure is composed of a header section and a card grid. The `nz-card` component is used to display each GDPR right.
- **CSS**: Styling is handled with LESS, providing a responsive grid layout for the cards and appropriate styling for each card's appearance.
- **TypeScript**: The component logic is managed using Angular. It defines the data structure for the rights and uses Angular's change detection strategy for efficient updates.

### Component Details

- **Selector**: `app-gdpr`
- **Template**: Includes a header section and a grid layout for displaying the rights.
- **Style**: Custom styles are applied to ensure responsiveness and visual clarity.
- **Change Detection**: Uses `ChangeDetectionStrategy.OnPush` for optimized performance.

### Dependencies

- **Angular**: The component leverages Angular's capabilities for templating and data binding.
- **ng-zorro-antd**: Utilizes `NzCardModule` and `NzIconModule` from NG-ZORRO for card and icon components.

## Usage

To integrate the GDPR feature into an Angular application:

1. **Import** the `GdprComponent` into the desired module.
2. **Add** `<app-gdpr></app-gdpr>` to the template where the GDPR information should be displayed.

## Links

- [Complete guide to GDPR Rights](https://gdpr-info.eu/chapter-3/)

## Notes

- Ensure that the component is responsive and accessible.
- Consider internationalization if the application supports multiple languages.

---

For further details on implementing or extending the GDPR feature, please refer to the Angular documentation and NG-ZORRO guidelines.