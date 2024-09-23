Instagram Shopping Component Documentation

Overview:

The InstaShoppingComponent manages the display of items in the Instagram shopping list and wishlist, providing statistics and detailed views of the items.

Features:

Statistics Overview: Displays the number of merchants and products in the shopping list and wishlist.

Charts Visualization: Graphical representation of shopping data using ECharts.

Searchable Tables: Features for searching within the shopping list and wishlist, enhancing the user's ability to manage large datasets.

HTML Structure:


<div [ngClass]="{'component-page': !previewMode}">
    <div>
        <!-- Static and dynamic content goes here -->
    </div>
</div>

Key Components:

nz-statistic: For showing the count of merchants and products.

nz-row and nz-col: Layout management.
nz-table: Interactive tables for the shopping list and wishlist with custom filter capabilities.
