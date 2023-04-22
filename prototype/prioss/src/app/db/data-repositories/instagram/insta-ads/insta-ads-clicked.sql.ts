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