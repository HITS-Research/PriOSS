export const insertIntoInstaPendingFollowRequestInfoSQL = `
  insert into insta_pending_follow_request_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectPendingFollowRequestInfo = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_pending_follow_request_info;
`;

export const insertPendingFollowRequestSQL = `
insert into insta_pending_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaPendingFollowRequestBaseSQL = `
insert into insta_pending_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddPendingFollowRequestValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;