
// INSERT Queries

export const insertIntoInstaShoppingSQL = `
    insert into insta_shopping 
    (merchantName, productName) 
    values (?, ?);
`;

export const bulkAddInstaShoppingBaseSQL = `
    insert into insta_shopping 
    (merchantName, productName) 
`;

export const bulkAddInstaShoppingValuesSQL = `
    select ?, ?
`;

export const bulkAddValueConnectorForShopping = `
    union all
`;

// SELECT Queries

export const selectInstaShoppingSQL = `
    select merchantName, productName from insta_shopping;
`;

export const getTotalMerchantCountSQL = `
 select count( DISTINCT merchantName) as totalMerchantCount from insta_shopping;
`;

export const getTotalProductCountSQL = `
 select count( DISTINCT productName) as totalProductCount from insta_shopping;
`;