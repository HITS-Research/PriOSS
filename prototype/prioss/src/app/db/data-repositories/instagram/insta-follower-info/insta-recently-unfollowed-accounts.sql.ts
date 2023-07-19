export const insertIntoInstaRecentlyUnfollowedAccountsInfoSQL: string = `
  insert into insta_recently_unfollowed_accounts_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRecentlyUnfollowedAccountsInfo: string = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_recently_unfollowed_accounts_info;
`;

export const insertRecentlyUnfollowedAccountsSQL: string = `
insert into insta_recently_unfollowed_accounts_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRecentlyUnfollowedAccountsBaseSQL: string = `
insert into insta_recently_unfollowed_accounts_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddRecentlyUnfollowedAccountsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;