// INSERT Queries

export const insertIntoInstaAdsActivitySQL = `
insert into insta_ads_activity
(advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
values 
(?, ?, ?, ?);
`;

export const bulkAddInstaAdsActivityBaseSQL = `
insert into insta_ads_activity 
(advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
`;

export const bulkAddInstaAdsActivityValuesSQL = `
select ?, ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

// SELECT Queries

export const selectInstaAdsActivitySQL = `
select advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit 
  from insta_ads_activity
 order by advertiserName asc;
`;