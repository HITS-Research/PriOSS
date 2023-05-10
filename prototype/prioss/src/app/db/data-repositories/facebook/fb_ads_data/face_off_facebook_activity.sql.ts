export const insertIntoFaceOffFacebookActivitySQL: string = `
insert into face_off_facebook_activity
(name, events, id, type, timestamp)
values 
(?, ?, ?, ?, ?);
`;

export const bulkAddFaceOffFacebookActivityBaseSQL: string = `
insert into face_off_facebook_activity 
(name, events, id, type, timestamp)
`;

export const bulkAddFaceOffFacebookActivityValuesSQL: string = `
select ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;