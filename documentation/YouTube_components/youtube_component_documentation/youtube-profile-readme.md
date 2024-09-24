# **YouTube Profile Component**

---

## **Component Overview**

### **YouTube Profile Component**

- **Major Files**:
    - `youtube-profile.component.html`
    - `youtube-profile.component.ts`

- **Purpose**:
    - This component displays the profile information of a YouTube user, including basic details such as name, email, and profile picture. It supports both detailed and preview modes, allowing for flexible display options based on context.

- **Usage**:
    - **Preview Mode**: Displays a simplified view of the user's profile, showcasing key information such as display name and email.
    - **Detailed Mode**: Offers a more comprehensive view of the user's profile, including a profile picture and additional details like first name, last name, gender, etc.

---

## **HTML Structure**

### **`youtube-profile.component.html`**

- **Overview**:
    - The HTML structure is designed to provide a responsive and user-friendly layout for displaying YouTube profile data in both preview and detailed modes.

- **Key Sections**:
    - **Preview Mode** (`*ngIf="previewMode"`):
        - Displays basic user information in a simplified format using `nz-statistic` components for attributes like display name and email.
        - Utilizes Angular’s conditional rendering (`*ngIf`) to hide detailed information when in preview mode.

    - **Detailed Mode** (`<ng-template #detailedMode>`):
        - A more extensive layout showing additional user details such as profile picture, first name, last name, and gender, rendered in a card-based UI (`nz-card`).
        - Includes a profile image with a fallback option for missing data and uses the `nz-table` component for organizing user details in a structured format.

---

## **TypeScript Logic**

### **`youtube-profile.component.ts`**

- **Overview**:
    - Handles the logic for fetching and displaying the user's profile data from the global state, along with switching between preview and detailed modes.

- **Key Methods**:
    - **`ngOnInit()`**:
        - Initializes the component by selecting the user profile data from the global `YouTubeState`.
        - Sets up the profile view based on the retrieved user data.

- **Data Structures**:
    - **`userProfile`**:
        - An object containing the user’s YouTube profile information, including first name, last name, display name, email, and gender, which is fetched from the store using `selectSnapshot(YouTubeState.getUserProfile)`.

- **Input Properties**:
    - **`@Input() previewMode: boolean`**:
        - Accepts a boolean value that determines whether the component should display the profile in preview mode or detailed mode.

---
