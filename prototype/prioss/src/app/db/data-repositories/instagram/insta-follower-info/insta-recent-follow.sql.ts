export const insertIntoInstaRecentFollowInfoSQL: string = `
  insert into insta_recent_follow_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRecentFollowInfo: string = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_recent_follow_info;
`;

export const insertIntoInstaRecentFollowSQL: string = `
insert into insta_recent_follow_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRecentFollowBaseSQL: string = `
insert into insta_recent_follow_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddInstaRecentFollowValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;