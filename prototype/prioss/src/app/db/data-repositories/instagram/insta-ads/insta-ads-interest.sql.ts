// INSERT Queries

export const insertIntoInstaAdsInterestsSQL = `
insert into insta_ads_interests
(interest)
values 
(?);
`;

export const bulkAddInstaAdsInterestsBaseSQL = `
insert into insta_ads_interests
(interest)
`;

export const bulkAddInstaAdsInterestsValuesSQL = `
select ?
`;

export const bulkAddValueConnector = `
union all
`;

// SELECT Queries

export const selectInstaAdsInterestSQL = `
select interest
  from insta_ads_interests
 order by interest asc;
`;