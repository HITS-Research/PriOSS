/**
* Prepares SQL query to bulk add login logout related data.
* 
* @param action login or logout action, to be added to face_login_logouts table. 
* @param timestamp timestamp to be added to the face_login_logouts table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceLoginLogoutsSQL: string = `
insert into face_login_logouts
(action, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceLoginLogoutsBaseSQL: string = `
insert into face_login_logouts
(action, timestamp)
`;

export const bulkAddFaceLoginLogoutsValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllLoginLogouts: string = `
select id, action, timestamp from face_login_logouts
`;