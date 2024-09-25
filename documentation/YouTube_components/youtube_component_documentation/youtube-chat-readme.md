# **YouTube Chat Component**

---

## **Component Overview**

### **YouTube Chat Component**

- **Major Files**:
    - `youtube-chat.component.html`
    - `youtube-chat.component.ts`

- **Purpose**:
    - This component handles the display and analysis of YouTube chat messages. It features two modes: preview and detailed. In the detailed mode, users can view both chat messages and related statistics, including a trend chart of messages over time.

- **Usage**:
    - **Preview Mode**: Displays a summary of the total number of live chats and the number of videos where these chats occurred.
    - **Detailed Mode**: Provides an interactive view of the YouTube chat messages as well as a line chart illustrating the trends of messages over time using ECharts.

---

## **HTML Structure**

### **`youtube-chat.component.html`**

- **Overview**:
    - The HTML template renders two views based on the `previewMode` input. The component uses `nz-statistic`, `nz-tabset`, and `ngx-echarts` for displaying the summary and detailed data, as well as the chat statistics.

- **Key Sections**:
    - **Preview Mode** (`*ngIf="previewMode"`):
        - Displays basic statistics such as:
            - **Total live chats**: Number of chat messages.
            - **Number of videos**: Count of unique videos where chats occurred.
        - Uses the `nz-statistic` component for a clean display of numerical data, enhanced by icons like `message` and `play-circle` from `ng-zorro-antd`.

    - **Detailed Mode** (`<ng-template #detailedMode>`):
        - Provides a more comprehensive view through `nz-tabset` containing two tabs:
            - **YouTube Chats Tab**: Displays detailed YouTube chat messages using the `YoutubeChatViewComponent`.
            - **Chat Statistics Tab**: Shows a line chart (ECharts) with message trends over time, alongside a descriptive text using the `nz-typography` component.

---

## **TypeScript Logic**

### **`youtube-chat.component.ts`**

- **Overview**:
    - Manages the logic for fetching chat messages from the global state, calculating the number of unique videos, and setting up charts for message trends. It also controls the switch between preview and detailed views.

- **Key Methods**:
    - **`ngOnInit()`**:
        - Initializes the component by selecting the user’s chat messages from the `YouTubeState`. It then calculates the number of unique videos and sets up the chat trend chart.

    - **`videoCount()`**:
        - Returns an array of unique video IDs by extracting them from the chat messages.

    - **`setupCharts()`**:
        - A helper method that calls `setupChatTrendChart()` to configure the ECharts options.

    - **`setupChatTrendChart()`**:
        - Processes the message data to generate a trend chart showing the number of messages per date. This data is formatted into a line chart using ECharts.

- **Data Structures**:
    - **`messages`**:
        - An array of `YouTubeChatData` objects representing the user's YouTube chat messages. Fetched from the global state.

    - **`videoCounts`**:
        - A numeric value representing the number of unique videos where live chats occurred.

    - **`chatTrendOptions`**:
        - An object containing the configuration for the ECharts line chart, which plots the number of chats over time.

- **Input Properties**:
    - **`@Input() previewMode: boolean`**:
        - Controls whether the component displays the preview or detailed view.

---
