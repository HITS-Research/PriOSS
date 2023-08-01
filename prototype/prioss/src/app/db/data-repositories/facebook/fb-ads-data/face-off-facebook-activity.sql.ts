export const insertIntoFaceOffFacebookActivitySQL = `
INSERT INTO face_off_facebook_activity
(name, events, type)
VALUES 
(?, ?, ?);
`;


export const bulkAddFaceOffFacebookActivityBaseSQL = `
insert into face_off_facebook_activity 
(name, events, type)
`;

export const bulkAddFaceOffFacebookActivityValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllFaceOffFacebookActivity = `
 select name,
        events,
        type
  from face_off_facebook_activity;
`;