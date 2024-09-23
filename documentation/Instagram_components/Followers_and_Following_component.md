Instagram Followers Component Documentation

Overview:

InstaFollowersComponent provides functionalities related to managing Instagram followers, including viewing follower statistics, managing follow requests, and handling blocked accounts.

Features:

Comprehensive Statistics: Displays detailed statistics related to followers, following, and blocked accounts.

Tabbed Interface: Organizes data into tabs for easier navigation and management.

Graph Visualization: Represents follower relationships in a graphical format, allowing interactive engagement.

Searchable and Paginated Lists: Enhances data handling capabilities for large sets of follower data.

HTML Structure:


<div [ngClass]="{'component-page': !previewMode}">
    <div *ngIf="!previewMode">
        <!-- Full view content -->
    </div>
</div>

Key Components:

nz-statistic: Used to display various statistics about followers and following.

nz-tabset: Manages multiple data views through tabs.

nz-table: Displays lists of followers, following, and other categories, equipped with search and pagination.