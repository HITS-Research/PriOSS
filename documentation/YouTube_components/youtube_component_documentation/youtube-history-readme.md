# **YouTube History Component**

---

## **Component Overview**

### **YouTube History Component**

- **Major Files**:
  - `youtube-history.component.html`
  - `youtube-history.component.ts`

- **Purpose**: 
  - This component is designed to visualize the user's YouTube search and watch history. It provides users with insights into their activities over time through various interactive charts and tables.

- **Usage**:
  - **Preview Mode**: Displays a summary of search and watch history using a simple chart.
  - **Detailed Mode**: Offers comprehensive details including:
    - **Search & Watch Stats**: Visualizes the number of searches and videos watched over time.
    - **Search History**: Displays a word cloud of recent search terms and a detailed list of search activities.
    - **Watch History**: Presents statistics on watched videos and channels, including a word cloud of video titles and a detailed list of watch activities.

---

## **HTML Structure**

### **`youtube-history.component.html`**

- **Overview**: 
  - The HTML file defines the structure and layout of the component, including the different tabs and charts for search and watch history.

- **Key Sections**:
  - **Preview Mode**: 
    - Displays a chart summarizing search and watch activities when the component is in preview mode.
  - **Detailed Mode**: 
    - Contains multiple tabs for detailed analysis:
      - **Search & Watch Stats**: Shows a graph visualizing search and watch history trends.
      - **Search History**:
        - **Word Cloud**: Visualizes the most recent search terms.
        - **Search History List**: Displays search activities in a collapsible list with details like search text and timestamp.
      - **Watch History**:
        - **Pie Chart**: Illustrates the watch history statistics of various YouTube channels.
        - **Word Cloud**: Represents the most recent watched video titles.
        - **Watch History List**: Provides a detailed list of watched videos with their respective channels and timestamps.

---

## **TypeScript Logic**

### **`youtube-history.component.ts`**

- **Overview**: 
  - This file contains the logic that powers the YouTube History component, handling data fetching, processing, and interaction with the user interface.

- **Key Methods**:
  - **`ngOnInit()`**: 
    - Initializes the component, setting up the necessary data and configuring the charts.
  - **`tabChangeHandler($event)`**: 
    - Handles the user's tab changes and updates the displayed data accordingly.
  - **`downloadCloud()`**: 
    - Triggers the download of the word cloud image.
  - **`redrawCloud()`**: 
    - Redraws the word cloud with the latest data.
  - **`clickHandler(event)`**: 
    - Manages user interactions with the charts, such as clicking on a pie chart segment to get more details.

- **Data Binding**:
  - **`echartOptions`**: 
    - Configures the charts for displaying search and watch history trends.
  - **`searchData`** and **`watchData`**: 
    - Holds the data for the word clouds representing search terms and watched video titles.
  - **`searchHistory`** and **`watchHistory`**: 
    - Contains the detailed lists of search and watch activities for the user.

---

