
// INSERT Queries

export const insertIntoInstaLikedCommentsSQL = `
    insert into insta_liked_comments 
    (user, href_link, timestamp) 
    values (?, ?, ?);
`;

export const bulkAddInstaLikedCommentsBaseSQL = `
    insert into insta_liked_comments 
    (user, href_link, timestamp)
`;

export const bulkAddInstaLikedCommentsValuesSQL = `
    select ?, ?, ?
`;

export const bulkAddValueConnectorForLikedComments = `
    union all
`;

export const insertIntoInstaLikedPostsSQL = `
    insert into insta_liked_posts 
    (user, href_link, timestamp) 
    values (?, ?, ?);
`;

export const bulkAddInstaLikedPostsBaseSQL = `
    insert into insta_liked_posts 
    (user, href_link, timestamp)
`;

export const bulkAddInstaLikedPostsValuesSQL = `
    select ?, ?, ?
`;

export const bulkAddValueConnectorForLikedPosts = `
    union all
`;

// SELECT Queries

export const selectLikedCommentsSQL = `
    select user, href_link, timestamp from insta_liked_comments;
`;

export const selectLikedCommentsWithCountSQL = `
 select user, count(user) as counts
 from insta_liked_comments
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const getFirstDateForLikedCommentsSQL = `
 select strftime('%Y-%m-%d', datetime(MIN(timestamp), 'unixepoch')) AS min_date
 from insta_liked_comments;
`;

export const getLastDateForLikedCommentsSQL = `
 select strftime('%Y-%m-%d', datetime(MAX(timestamp), 'unixepoch')) AS max_date
 from insta_liked_comments;
`;

export const filterLikedCommentBasedOnStartAndEndDateSQL = `
 select user, count(user) as counts
 from insta_liked_comments
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?)
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const filterLikedCommentBasedOnUserAndStartAndEndDateSQL = `
 select user, count(user) as counts
 from insta_liked_comments
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?) AND user == ?
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const selectLikedPostsSQL = `
    select user, href_link, timestamp from insta_liked_posts;
`;

export const selectLikedPostsWithCountSQL = `
 select user, count(user) as counts
 from insta_liked_posts
 group by user
 having (count(user) > 0)
 order by count(user) desc LIMIT 10;
`;

export const getFirstDateForLikedPostsSQL = `
 select strftime('%Y-%m-%d', datetime(MIN(timestamp), 'unixepoch')) AS min_date
 from insta_liked_posts;
`;

export const getLastDateForLikedPostsSQL = `
 select strftime('%Y-%m-%d', datetime(MAX(timestamp), 'unixepoch')) AS max_date
 from insta_liked_posts;
`;

export const filterLikedPostsBasedOnStartAndEndDateSQL = `
 select user, count(user) as counts
 from insta_liked_posts
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?)
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const filterLikedPostsBasedOnUserAndStartAndEndDateSQL = `
 select user, count(user) as counts
 from insta_liked_posts
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?) AND user == ?
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;