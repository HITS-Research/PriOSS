
// INSERT Queries

export const insertIntoInstaShoppingWishlistSQL = `
    insert into insta_shopping_wishlist 
    (merchantName, productName) 
    values (?, ?);
`;

export const bulkAddInstaShoppingWishlistBaseSQL = `
    insert into insta_shopping_wishlist 
    (merchantName, productName) 
`;

export const bulkAddInstaShoppingWishlistValuesSQL = `
    select ?, ?
`;

export const bulkAddValueConnectorForShoppingWishlist = `
    union all
`;

// SELECT Queries

export const selectInstaShoppingWishlistSQL = `
    select merchantName, productName from insta_shopping_wishlist;
`;

export const getTotalMerchantCountSQL = `
 select count( DISTINCT merchantName) as totalMerchantCount from insta_shopping_wishlist;
`;

export const getTotalProductCountSQL = `
 select count( DISTINCT productName) as totalProductCount from insta_shopping_wishlist;
`;