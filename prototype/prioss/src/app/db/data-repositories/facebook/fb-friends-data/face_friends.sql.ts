/**
* Prepares SQL query to bulk add facebook friends data.
* 
* @param name name of the friend of the user, to be added to the face_friends table.
* @param timestamp timestamp to be added to the face_friends table
*
* @author: rbharmal (rbharmal@mail.upb.de)
*
*/

export const insertIntoFaceFriendsSQL: string = `
insert into face_friends
(name, timestamp, type)
values 
(?, ?, ?);
`;

export const bulkAddFaceFriendsBaseSQL: string = `
insert into face_friends
(name, timestamp, type)
`;

export const bulkAddFaceFriendsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllFacebookFriends: string = `
select id, name, timestamp, type from face_friends
`