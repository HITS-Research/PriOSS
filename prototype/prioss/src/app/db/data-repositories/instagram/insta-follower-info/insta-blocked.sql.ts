export const insertIntoInstaBlockedInfoSQL = `
  insert into insta_blocked_info
  (instaAccountName, instaProfileURL, timestamp)
  values 
  (?, ?, ?);
`;

export const selectInstaBlockedInfo = `
  select instaAccountName,
  instaProfileURL,
  timestamp        
    from insta_blocked_info;
`;

export const insertIntoInstaBlockedSQL = `
insert into insta_blocked_info
(instaAccountName, instaProfileURL, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaBlockedBaseSQL = `
insert into insta_blocked_info
(instaAccountName, instaProfileURL, timestamp)
`;

export const bulkAddInstaBlockedValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;