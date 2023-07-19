/**
* Prepares SQL query to bulk add groups data.
* 
* @param name name of the group, to be added to face_groups table. 
* @param timestamp timestamp to be added to the face_groups table
* 
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceGroupsSQL: string = `
insert into face_groups
(name, timestamp)
values 
(?, ?);
`;

export const bulkAddFaceGroupsBaseSQL: string = `
insert into face_groups
(name, timestamp)
`;

export const bulkAddFaceGroupsValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllGroups: string = `
select * from face_groups
`;

