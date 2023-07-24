// INSERT Queries

export const insertIntoInstaAdsViewedSQL = `
insert into insta_ads_viewed
(title, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaAdsViewedBaseSQL = `
insert into insta_ads_viewed
(title, timestamp)
`;

export const bulkAddInstaAdsViewedValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

// SELECT Queries

export const selectInstaAdsViewedSQL = `
select title, timestamp
  from insta_ads_viewed
 order by title asc;
`;