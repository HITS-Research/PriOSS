/**
* Prepares SQL query to bulk add login locations data.
* 
* @param location location of the login activity, to be added to face_login_locations table. 
* @param device name of the device of the user, to be added to the face_login_locations table.
* @param timestamp timestamp to be added to the face_login_locations table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceLoginLocationsSQL = `
insert into face_login_locations
(location, device, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceLoginLocationsBaseSQL = `
insert into face_login_locations
(location, device, timestamp)
`;

export const bulkAddFaceLoginLocationsValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllLoginLocations = `
select id, location, device, timestamp from face_login_locations
`;