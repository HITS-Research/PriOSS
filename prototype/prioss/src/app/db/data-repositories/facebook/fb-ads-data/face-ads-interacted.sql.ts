/**
* Prepares SQL query to bulk add facebook ads interaction data.
* 
* @param title the tilte of the advertiser that has been interacted with to be added to the face_ads_interacted table.
* @param action the action the user performed to be added to the face_ads_interacted table.
* @param timestamp timestamp to be added to the face_ads_interacted table
*
* @author: Deepa (dbelvi@mail.upb.de)
*/

export const insertIntoFaceAdsInteractedSQL = `
insert into face_ads_interacted
(title, action, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceAdsInteractedBaseSQL = `
insert into face_ads_interacted
(title, action, timestamp)
`;

export const bulkAddFaceAdsInteractedValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllFaceAdsInteracted = `
 select id,
        title,
        action,
        timestamp
  from face_ads_interacted;
`;