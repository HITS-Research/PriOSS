export const insertIntoInstaFollowerInfoSQL: string = `
  insert into insta_follower_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const insertIntoInstaFollowingInfoSQL: string = `
  insert into insta_follower_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectFollowerInfo: string = `
  select instaProfileURL,
        instaAccountName,
        timestamp
    from insta_follower_info;
`;

export const selectFollowingInfo: string = `
  select instaProfileURL,
        instaAccountName,
        timestamp
    from insta_following_info;
`;