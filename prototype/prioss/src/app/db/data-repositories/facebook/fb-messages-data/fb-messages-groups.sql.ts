/**
* Prepares SQL query to bulk add facebook messages info data.
* 
*  @param name the name of the person that you interacted with should be added to the Facebook Messages table.
*  @param value the the number of times  when you interacted that should be added to the Facebook Messages table.
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceGroupMessagesInfoSQL: string = `
insert into face_group_messages
(name,value)
values 
(?, ?);
`;

export const bulkAddFaceGroupMessagesInfoBaseSQL: string = `
insert into face_group_messages
(name,value)
`;

export const bulkAddFaceGroupMessagesInfoValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;
export const selectAllFaceGroupMessagesInfoData: string = `
 select id,
        name,
        value
  from face_group_messages;
`;