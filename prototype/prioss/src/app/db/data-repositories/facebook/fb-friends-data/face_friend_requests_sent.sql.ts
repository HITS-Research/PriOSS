/**
* Prepares SQL query to bulk add facebook friend requests sent data.
* 
* @param name name of the friend to whom freind request was sent, to be added to the face_friend_requests_sent table.
* @param timestamp timestamp at which the request was sent, to be added to the face_friend_requests_sent table*
* 
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceFriendRequestsSentSQL: string = `
insert into face_friend_requests_sent
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceFriendRequestsSentBaseSQL: string = `
insert into face_friend_requests_sent
(name, timestamp)
`;

export const bulkAddFaceFriendRequestsSentValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;