/**
* Prepares SQL query to bulk add login logout related data.
* 
* @param action login or logout action, to be added to face_login_logouts table. 
* @param timestamp timestamp to be added to the face_login_logouts table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceLoginLogoutsSQL = `
insert into face_login_logouts
(action, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceLoginLogoutsBaseSQL = `
insert into face_login_logouts
(action, timestamp)
`;

export const bulkAddFaceLoginLogoutsValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllLoginLogouts = `
select id, action, timestamp from face_login_logouts
`;