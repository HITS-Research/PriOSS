export const insertIntoFaceOffFacebookActivitySQL: string = `
INSERT INTO face_off_facebook_activity
(name, events, type)
VALUES 
(?, ?, ?);
`;


export const bulkAddFaceOffFacebookActivityBaseSQL: string = `
insert into face_off_facebook_activity 
(name, events, type)
`;

export const bulkAddFaceOffFacebookActivityValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;
export const selectAllFaceOffFacebookActivity: string = `
 select name,
        events,
        type
  from face_off_facebook_activity;
`;