/**
* Prepares SQL query to bulk add groups data.
* 
* @param name name of the group, to be added to face_events table. 
* @param start_timestamp start of the event timestamp to be added to the face_events table
* @param end_timestamp end of the event timestamp to be added to the table face_events.
* 
* @author: Deepa (dbelvi@mail.upb.de)
*
*/

export const insertIntoFaceEventsSQL: string = `
insert into face_events
(name, start_timestamp, end_timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceEventsBaseSQL: string = `
insert into face_events
(name, start_timestamp, end_timestamp)
`;

export const bulkAddFaceEventsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllEvents: string = `
select * from face_events
`;

