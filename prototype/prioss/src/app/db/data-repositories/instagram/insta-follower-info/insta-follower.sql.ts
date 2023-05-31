export const insertIntoInstaFollowerInfoSQL: string = `
  insert into insta_follower_info
  (instaProfileURL, timestamp, instaAccountName)
  values 
  (?, ?, ?);
`;

export const insertIntoInstaFollowingInfoSQL: string = `
  insert into insta_follower_info
  (instaProfileURL, timestamp, instaAccountName)
  values 
  (?, ?, ?);
`;

export const selectFollowerInfo: string = `
  select instaProfileURL,
        timestamp,
        instaAccountName        
    from insta_follower_info;
`;

export const selectFollowingInfo: string = `
select instaProfileURL,
        timestamp,
        instaAccountName 
    from insta_following_info;
`;