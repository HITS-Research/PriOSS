
// INSERT Queries

export const insertIntoInstaShoppingSQL: string = `
    insert into insta_shopping 
    (merchantName, productName) 
    values (?, ?);
`;

export const bulkAddInstaShoppingBaseSQL: string = `
    insert into insta_shopping 
    (merchantName, productName) 
`;

export const bulkAddInstaShoppingValuesSQL: string = `
    select ?, ?
`;

export const bulkAddValueConnectorForShopping: string = `
    union all
`;

// SELECT Queries

export const selectInstaShoppingSQL: string = `
    select merchantName, productName from insta_shopping;
`;

export const getTotalMerchantCountSQL: string = `
 select count( DISTINCT merchantName) as totalMerchantCount from insta_shopping;
`;

export const getTotalProductCountSQL: string = `
 select count( DISTINCT productName) as totalProductCount from insta_shopping;
`;