export const insertIntoInstaRecentFollowInfoSQL = `
  insert into insta_recent_follow_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRecentFollowInfo = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_recent_follow_info;
`;

export const insertIntoInstaRecentFollowSQL = `
insert into insta_recent_follow_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRecentFollowBaseSQL = `
insert into insta_recent_follow_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddInstaRecentFollowValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;