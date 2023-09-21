/**
* Prepares SQL query to bulk add facebook search hostory data.
* 
* @param text the search lists that should be added to the Facebook Search History table.
* @param timestamp the timestamp of the content searched  that should be added to the Facebook Search History table.
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceSearchHistorySQL = `
insert into face_search_history
(text,timestamp)
values 
(?, ?);
`;

export const bulkAddFaceSearchHistoryBaseSQL = `
insert into face_search_history
(text,timestamp)
`;

export const bulkAddFaceSearchHistoryValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllSearchHistoryData = `
 select id,
        text,
        timestamp
  from face_search_history;
`;