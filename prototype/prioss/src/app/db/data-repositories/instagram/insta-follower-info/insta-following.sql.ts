export const insertIntoInstaFollowingInfoSQL: string = `
  insert into insta_following_info
  (instaProfileURL, timestamp, instaAccountName)
  values 
  (?, ?, ?);
`;

export const selectFollowingInfo: string = `
select instaProfileURL,
        timestamp,
        instaAccountName 
    from insta_following_info;
`;

export const insertIntoInstaFollowingSQL: string = `
insert into insta_follower_info
(instaProfileURL, timestamp, instaAccountName)
values 
(?, ?, ?);
`;

export const bulkAddInstaFollowingBaseSQL: string = `
insert into insta_following_info
(instaProfileURL, timestamp, instaAccountName)
`;

export const bulkAddInstaFollowingValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;