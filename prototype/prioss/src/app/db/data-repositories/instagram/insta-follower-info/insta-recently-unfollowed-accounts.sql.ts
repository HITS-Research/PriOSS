export const insertIntoInstaRecentlyUnfollowedAccountsInfoSQL = `
  insert into insta_recently_unfollowed_accounts_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRecentlyUnfollowedAccountsInfo = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_recently_unfollowed_accounts_info;
`;

export const insertRecentlyUnfollowedAccountsSQL = `
insert into insta_recently_unfollowed_accounts_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRecentlyUnfollowedAccountsBaseSQL = `
insert into insta_recently_unfollowed_accounts_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddRecentlyUnfollowedAccountsValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;