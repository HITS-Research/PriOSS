/**
* Prepares SQL query to bulk add facebook messages info data.
* 
* @param name the name of the person that you interacted with should be added to the Facebook Messages table.
* @param timestamp the timestamp of the person when you interacted that should be added to the Facebook Messages table.
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceMessagesInfoSQL = `
insert into face_messages
(name,timestamp)
values 
(?, ?);
`;

export const bulkAddFaceMessagesInfoBaseSQL = `
insert into face_messages
(name,timestamp)
`;

export const bulkAddFaceMessagesInfoValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllFaceMessagesInfoData = `
 select id,
        name,
        timestamp
  from face_messages;
`;