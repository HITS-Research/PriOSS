/**
* Prepares SQL query to bulk add facebook friends data.
* 
* @param name name of the friend who was removed by the user, to be added to the face_removed_friends table.
* @param timestamp timestamp of the action to be added to the face_removed_friends table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceRemovedFriendsSQL: string = `
insert into face_removed_friends
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceRemovedFriendsBaseSQL: string = `
insert into face_removed_friends
(name, timestamp)
`;

export const bulkAddFaceRemovedFriendsValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;