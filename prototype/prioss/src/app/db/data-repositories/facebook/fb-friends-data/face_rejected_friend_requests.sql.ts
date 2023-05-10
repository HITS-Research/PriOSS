/**
* Prepares SQL query to bulk add facebook friends data.
* 
* @param name name of the friend whose request was rejected by the user, to be added to the face_rejected_friend_requests table.
* @param timestamp timestamp to be added to the face_rejected_friend_requests table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceRejectedFriendRequestsSQL: string = `
insert into face_rejected_friend_requests
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceRejectedFriendRequestsBaseSQL: string = `
insert into face_rejected_friend_requests
(name, timestamp)
`;

export const bulkAddFaceRejectedFriendRequestsValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;