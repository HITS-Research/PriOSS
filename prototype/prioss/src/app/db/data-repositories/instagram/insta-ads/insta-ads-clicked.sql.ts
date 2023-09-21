// INSERT Queries

export const insertIntoInstaAdsClickedSQL = `
insert into insta_ads_clicked
(title, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaAdsClickedBaseSQL = `
insert into insta_ads_clicked
(title, timestamp)
`;

export const bulkAddInstaAdsClickedValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

// SELECT Queries

export const selectInstaAdsClickedSQL = `
select title, timestamp
  from insta_ads_clicked
 order by title asc;
`;