export const insertIntoInstaReceivedFollowRequestInfoSQL = `
  insert into insta_received_follow_request_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectReceivedFollowRequestInfo = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_received_follow_request_info;
`;

export const insertReceivedFollowRequestSQL = `
insert into insta_received_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaReceivedFollowRequestBaseSQL = `
insert into insta_received_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddReceivedFollowRequestValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;