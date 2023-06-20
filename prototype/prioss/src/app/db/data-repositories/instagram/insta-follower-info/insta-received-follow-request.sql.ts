export const insertIntoInstaReceivedFollowRequestInfoSQL: string = `
  insert into insta_received_follow_request_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectReceivedFollowRequestInfo: string = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_received_follow_request_info;
`;

export const insertReceivedFollowRequestSQL: string = `
insert into insta_received_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaReceivedFollowRequestBaseSQL: string = `
insert into insta_received_follow_request_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddReceivedFollowRequestValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;