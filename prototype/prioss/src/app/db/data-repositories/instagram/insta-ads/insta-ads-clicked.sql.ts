// INSERT Queries

export const insertIntoInstaAdsClickedSQL: string = `
insert into insta_ads_clicked
(title, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaAdsClickedBaseSQL: string = `
insert into insta_ads_clicked
(title, timestamp)
`;

export const bulkAddInstaAdsClickedValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

// SELECT Queries

export const selectInstaAdsClickedSQL: string = `
    select 
    title, timestamp
    from insta_ads_clicked;
`;