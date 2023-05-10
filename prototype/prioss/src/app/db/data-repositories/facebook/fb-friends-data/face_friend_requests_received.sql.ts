/**
* Prepares SQL query to bulk add facebook friend requests received data.
* 
* @param name name of the friend from whom freind request was received, to be added to the face_friend_requests_received table.
* @param timestamp timestamp at which the request was received, to be added to the face_friend_requests_received table*
* 
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceFriendRequestReceivedSQL: string = `
insert into face_friend_requests_received
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceFriendRequestReceivedBaseSQL: string = `
insert into face_friend_requests_received
(name, timestamp)
`;

export const bulkAddFaceFriendRequestReceivedValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;