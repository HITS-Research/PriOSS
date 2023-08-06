/**
* Prepares SQL query to bulk add change in status data.
* 
* @param status Account status, to be added to face_account_status_changes. table. 
* @param timestamp timestamp to be added to the face_account_status_changes. table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceStatusChangesSQL = `
insert into face_account_status_changes
(status, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceStatusChangesBaseSQL = `
insert into face_account_status_changes
(status, timestamp)
`;

export const bulkAddFaceStatusChangesValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllStatusChanges = `
select id, status, timestamp from face_account_status_changes
`;