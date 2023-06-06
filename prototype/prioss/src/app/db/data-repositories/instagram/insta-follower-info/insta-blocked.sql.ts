export const insertIntoInstaBlockedInfoSQL: string = `
  insert into insta_blocked_info
  (instaAccountName, instaProfileURL, timestamp)
  values 
  (?, ?, ?);
`;

export const selectInstaBlockedInfo: string = `
  select instaAccountName,
  instaProfileURL,
  timestamp        
    from insta_blocked_info;
`;

export const insertIntoInstaBlockedSQL: string = `
insert into insta_blocked_info
(instaAccountName, instaProfileURL, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaBlockedBaseSQL: string = `
insert into insta_blocked_info
(instaAccountName, instaProfileURL, timestamp)
`;

export const bulkAddInstaBlockedValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;