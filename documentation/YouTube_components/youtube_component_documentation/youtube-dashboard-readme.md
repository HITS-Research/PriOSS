# **YouTube Dashboard Component**

---

## **Component Overview**

### **YouTube Dashboard Component**

- **Major Files**:
  - `youtube-dashboard.component.html`
  - `youtube-dashboard.component.ts`

- **Purpose**: 
  - This component serves as the central hub for the YouTube segment of the PriOSS project, providing a comprehensive overview of various YouTube data aspects like profiles, channels, videos, subscriptions, comments, chats, playlists, history, and purposes.

- **Usage**:
  - **Visualization Cards**: Offers a series of dash cards that link to detailed views of respective YouTube data components.
  - **Rectification Section**: Provides a step-by-step guide for users to rectify any discrepancies in their YouTube data.
  - **Privacy Recommendations**: Assists users in evaluating and adjusting their privacy settings through interactive forms.

---

## **HTML Structure**

### **`youtube-dashboard.component.html`**

- **Overview**: 
  - The HTML structure provides a user-friendly interface for navigating different aspects of YouTube data management, visualized through various components integrated into the dashboard.

- **Key Sections**:
  - **Introduction Section**: 
    - Welcomes users with a customized greeting and anchors to the main visualization section.
  - **Visualization Section**: 
    - Organized in accordion format, contains cards for quick access to specific data categories like profile, channels, subscriptions, etc.
  - **Rectification Section**: 
    - Guides users through correcting their data, with detailed steps and relevant imagery to assist in navigation and actions.
  - **Privacy Recommendations Section**: 
    - Offers tools to review and adjust privacy settings specific to YouTube usage.
  - **Additional Information**: 
    - Provides links to further resources and detailed usage instructions via an embedded YouTube purposes component.

---

## **TypeScript Logic**

### **`youtube-dashboard.component.ts`**

- **Overview**: 
  - Manages the interaction logic for the YouTube Dashboard, handling data initialization, state management, and navigation through rectification steps.

- **Key Methods**:
  - **`ngOnInit()`**: 
    - Initializes the component by fetching user data from the state and setting up the initial view.
  - **`nextStep()` and `previousStep()`**: 
    - Navigate through the rectification steps, updating the view and instructions based on the current step.
  - **`updateRectificationContent()`**: 
    - Updates the content displayed in the rectification section based on the current step.
  - **`setRectificationContent(text: string, picture: string)`**: 
    - Sets the detailed text and associated picture for each rectification step.
  - **`startTour()`**: 
    - Initiates a guided tour of the dashboard, providing an interactive way for new users to get acquainted with the features.

- **Data Structures**:
  - **`steps`**: 
    - An array of objects detailing each step in the rectification process, including text descriptions and images.
  - **`userData`**: 
    - Stores the user's YouTube data fetched from the global state, utilized across the dashboard for various data displays.

---
