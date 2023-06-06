// INSERT Queries

export const insertIntoInstaAdsInterestsSQL: string = `
insert into insta_ads_interests
(interest)
values 
(?);
`;

export const bulkAddInstaAdsInterestsBaseSQL: string = `
insert into insta_ads_interests
(interest)
`;

export const bulkAddInstaAdsInterestsValuesSQL: string = `
select ?
`;

export const bulkAddValueConnector: string = `
union all
`;

// SELECT Queries

export const selectInstaAdsInterestSQL: string = `
    select 
    interest
    from insta_ads_interests;
`;