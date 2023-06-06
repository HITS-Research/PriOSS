// INSERT Queries

export const insertIntoInstaAdsActivitySQL: string = `
insert into insta_ads_activity
(advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
values 
(?, ?, ?, ?);
`;

export const bulkAddInstaAdsActivityBaseSQL: string = `
insert into insta_ads_activity 
(advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
`;

export const bulkAddInstaAdsActivityValuesSQL: string = `
select ?, ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

// SELECT Queries

export const selectInstaAdsActivitySQL: string = `
    select 
    advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit 
    from insta_ads_activity;
`;