// INSERT Queries

export const insertIntoInstaAdsViewedSQL: string = `
insert into insta_ads_viewed
(title, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaAdsViewedBaseSQL: string = `
insert into insta_ads_viewed
(title, timestamp)
`;

export const bulkAddInstaAdsViewedValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

// SELECT Queries

export const selectInstaAdsViewedSQL: string = `
select title, timestamp
  from insta_ads_viewed
 order by title asc;
`;