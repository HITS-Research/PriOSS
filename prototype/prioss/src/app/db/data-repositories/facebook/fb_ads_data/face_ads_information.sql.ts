export const insertIntoFaceAdsInformationSQL: string = `
insert into insta_ads_activity
(advertiser_name, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
values 
(?, ?, ?, ?);
`;

export const bulkAddFaceAdsInformationBaseSQL: string = `
insert into insta_ads_activity 
(advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit)
`;

export const bulkAddFaceAdsInformationValuesSQL: string = `
select ?, ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;