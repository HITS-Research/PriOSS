export const insertIntoFaceAppsWebsitesSQL = `
insert into face_apps_websites
(name, added_timestamp, user_app_scoped_id, category, removed_timestamp)
values 
(?, ?, ?, ?, ?);
`;

export const bulkAddFaceAppsWebsitesBaseSQL = `
insert into face_apps_websites 
(name, added_timestamp, user_app_scoped_id, category, removed_timestamp)
`;

export const bulkAddFaceAppsWebsitesValuesSQL = `
select ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllFaceAppsAndWebsites = `
 select id,
        name,
        added_timestamp,
        user_app_scoped_id,
        category,
        removed_timestamp
  from face_apps_websites;
`;