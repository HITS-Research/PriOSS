export const insertIntoInstaPendingFollowRequestInfoSQL: string = `
  insert into insta_pending_follow_request_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectPendingFollowRequestInfo: string = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_pending_follow_request_info;
`;

export const insertPendingFollowRequestSQL: string = `
insert into insta_pending_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaPendingFollowRequestBaseSQL: string = `
insert into insta_pending_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddPendingFollowRequestValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;