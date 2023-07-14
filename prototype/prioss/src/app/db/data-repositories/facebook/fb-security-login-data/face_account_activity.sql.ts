/**
* Prepares SQL query to bulk add account activities data.
* 
* @param action action data, to be added to face_account_activity table. 
* @param timestamp timestamp to be added to the face_account_activity table
* @param city city in which the action was performed, to be added to face_account_activity table.
* @param region region of the city, to be added to face_account_activity table.
* @param country country of the region, to be added to face_account_activity table.
* @param site_name site for which the action was performed, to be added to face_account_activity table.
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceAccountActivitySQL: string = `
insert into face_account_activity
(action, timestamp, city, region, country, site_name)
values 
(?, ?, ?, ?, ?, ?);
`;

export const bulkAddFaceAccountActivityBaseSQL: string = `
insert into face_account_activity
(action, timestamp, city, region, country, site_name)
`;

export const bulkAddFaceAccountActivityValuesSQL: string = `
select ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllAccountActivity: string = `
select id, action, timestamp, city, region, country, site_name from face_account_activity
`;

// export const selectAllAccountActivity: string = `
// select * from face_account_activity
// `;
