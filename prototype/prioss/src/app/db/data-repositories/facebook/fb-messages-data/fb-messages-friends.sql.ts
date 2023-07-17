/**
* Prepares SQL query to bulk add facebook messages info data.
* 
* @param name the name of the person that you interacted with should be added to the Facebook Messages table.
* @param timestamp the timestamp of the person when you interacted that should be added to the Facebook Messages table.
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceMessagesInfoSQL: string = `
insert into face_messages
(name,timestamp)
values 
(?, ?);
`;

export const bulkAddFaceMessagesInfoBaseSQL: string = `
insert into face_messages
(name,timestamp)
`;

export const bulkAddFaceMessagesInfoValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;
export const selectAllFaceMessagesInfoData: string = `
 select id,
        name,
        timestamp
  from face_messages;
`;