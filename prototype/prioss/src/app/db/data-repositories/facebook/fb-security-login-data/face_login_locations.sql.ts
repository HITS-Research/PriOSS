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

export const insertIntoFaceLoginLocationsSQL: string = `
insert into face_login_locations
(location, device, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceLoginLocationsBaseSQL: string = `
insert into face_login_locations
(location, device, timestamp)
`;

export const bulkAddFaceLoginLocationsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllLoginLocations: string = `
select id, location, device, timestamp from face_login_locations
`