export const insertIntoFaceAppsWebsitesSQL: string = `
insert into face_apps_websites
(name, added_timestamp, user_app_scoped_id, category, removed_timestamp)
values 
(?, ?, ?, ?, ?);
`;

export const bulkAddFaceAppsWebsitesBaseSQL: string = `
insert into face_apps_websites 
(name, added_timestamp, user_app_scoped_id, category, removed_timestamp)
`;

export const bulkAddFaceAppsWebsitesValuesSQL: string = `
select ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;
export const selectAllFaceAppsAndWebsites: string = `
 select id,
        name,
        added_timestamp,
        user_app_scoped_id,
        category,
        removed_timestamp
  from face_apps_websites;
`;