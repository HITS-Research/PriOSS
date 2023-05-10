/**
* Prepares SQL query to bulk add facebook friend followers data.
* 
* @param name name of the friend who is followed by the user, to be added to the face_who_you_follow table.
* @param timestamp timestamp of the action to be added to the face_who_you_follow table
*
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceWhoYouFollowSQL: string = `
insert into face_who_you_follow
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceWhoYouFollowBaseSQL: string = `
insert into face_who_you_follow
(name, timestamp)
`;

export const bulkAddFaceWhoYouFollowValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;