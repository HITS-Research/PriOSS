
// INSERT Queries

export const insertIntoInstaShoppingWishlistSQL: string = `
    insert into insta_shopping_wishlist 
    (merchantName, productName) 
    values (?, ?);
`;

export const bulkAddInstaShoppingWishlistBaseSQL: string = `
    insert into insta_shopping_wishlist 
    (merchantName, productName) 
`;

export const bulkAddInstaShoppingWishlistValuesSQL: string = `
    select ?, ?
`;

export const bulkAddValueConnectorForShoppingWishlist: string = `
    union all
`;

// SELECT Queries

export const selectInstaShoppingWishlistSQL: string = `
    select merchantName, productName from insta_shopping_wishlist;
`;

export const getTotalMerchantCountSQL: string = `
 select count( DISTINCT merchantName) as totalMerchantCount from insta_shopping_wishlist;
`;

export const getTotalProductCountSQL: string = `
 select count( DISTINCT productName) as totalProductCount from insta_shopping_wishlist;
`;