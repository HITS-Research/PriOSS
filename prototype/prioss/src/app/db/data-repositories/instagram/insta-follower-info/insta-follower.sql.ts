export const insertIntoInstaFollowerInfoSQL = `
  insert into insta_follower_info
  (instaProfileURL, timestamp, instaAccountName)
  values 
  (?, ?, ?);
`;

export const selectFollowerInfo = `
  select instaProfileURL,
        timestamp,
        instaAccountName        
    from insta_follower_info;
`;

export const insertIntoInstaFollowerSQL = `
insert into insta_follower_info
(instaProfileURL, timestamp, instaAccountName)
values 
(?, ?, ?);
`;

export const bulkAddInstaFollowerBaseSQL = `
insert into insta_follower_info
(instaProfileURL, timestamp, instaAccountName)
`;

export const bulkAddInstaFollowerValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;