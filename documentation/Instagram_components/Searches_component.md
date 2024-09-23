Instagram Searches Component Documentation


Overview:

The InstaSearchesComponent is designed to display and manage Instagram search data, categorized into user searches, keyword searches, and tag searches. It offers a dual view mode: a condensed preview and a detailed full mode.

Features:

Dual View Modes: Toggle between a condensed preview and a detailed view.

Statistics Display: Show statistics for user, keyword, and tag searches.

Dynamic Filters: Filter results based on search categories.

Word Cloud Visualization: Visual representation of search data, with options to download the image or refresh the visualization.

Chart Integration: Includes a chart to visually display search data, updating dynamically based on applied filters.


HTML Structure


<div [ngClass]="{'component-page': !previewMode}">
    <div *ngIf="previewMode">
        <!-- Preview mode content here -->
    </div>
    <div *ngIf="!previewMode">
        <!-- Full mode content here -->
    </div>
</div>

Key Components:

nz-statistic: Displays the number of searches for different categories.

nz-row and nz-col: Used for layout and alignment of components.

button: Buttons to apply different filters to the search data.

nz-card: Card layout to wrap the word cloud and chart visualizations.
