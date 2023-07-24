export const insertIntoInstaFollowingInfoSQL = `
  insert into insta_following_info
  (instaProfileURL, timestamp, instaAccountName)
  values 
  (?, ?, ?);
`;

export const selectFollowingInfo = `
select instaProfileURL,
        timestamp,
        instaAccountName 
    from insta_following_info;
`;

export const insertIntoInstaFollowingSQL = `
insert into insta_follower_info
(instaProfileURL, timestamp, instaAccountName)
values 
(?, ?, ?);
`;

export const bulkAddInstaFollowingBaseSQL = `
insert into insta_following_info
(instaProfileURL, timestamp, instaAccountName)
`;

export const bulkAddInstaFollowingValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;