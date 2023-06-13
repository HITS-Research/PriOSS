
// INSERT Queries

export const insertIntoInstaLikedCommentsSQL: string = `
    insert into insta_liked_comments 
    (user, href_link, timestamp) 
    values (?, ?, ?);
`;

export const bulkAddInstaLikedCommentsBaseSQL: string = `
    insert into insta_liked_comments 
    (user, href_link, timestamp)
`;

export const bulkAddInstaLikedCommentsValuesSQL: string = `
    select ?, ?, ?
`;

export const bulkAddValueConnectorForLikedComments: string = `
    union all
`;

export const insertIntoInstaLikedPostsSQL: string = `
    insert into insta_liked_posts 
    (user, href_link, timestamp) 
    values (?, ?, ?);
`;

export const bulkAddInstaLikedPostsBaseSQL: string = `
    insert into insta_liked_posts 
    (user, href_link, timestamp)
`;

export const bulkAddInstaLikedPostsValuesSQL: string = `
    select ?, ?, ?
`;

export const bulkAddValueConnectorForLikedPosts: string = `
    union all
`;

// SELECT Queries

export const selectLikedCommentsSQL: string = `
    select user, href_link, timestamp from insta_liked_comments;
`;

export const selectLikedCommentsWithCountSQL: string = `
 select user, count(user) as counts
 from insta_liked_comments
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const getFirstDateForLikedCommentsSQL: string = `
 select strftime('%Y-%m-%d', datetime(MIN(timestamp), 'unixepoch')) AS min_date
 from insta_liked_comments;
`;

export const getLastDateForLikedCommentsSQL: string = `
 select strftime('%Y-%m-%d', datetime(MAX(timestamp), 'unixepoch')) AS max_date
 from insta_liked_comments;
`;

export const filterLikedCommentBasedOnStartAndEndDateSQL: string = `
 select user, count(user) as counts
 from insta_liked_comments
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?)
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const filterLikedCommentBasedOnUserAndStartAndEndDateSQL: string = `
 select user, count(user) as counts
 from insta_liked_comments
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?) AND user == ?
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const selectLikedPostsSQL: string = `
    select user, href_link, timestamp from insta_liked_posts;
`;

export const selectLikedPostsWithCountSQL: string = `
 select user, count(user) as counts
 from insta_liked_posts
 group by user
 having (count(user) > 0)
 order by count(user) desc LIMIT 10;
`;

export const getFirstDateForLikedPostsSQL: string = `
 select strftime('%Y-%m-%d', datetime(MIN(timestamp), 'unixepoch')) AS min_date
 from insta_liked_posts;
`;

export const getLastDateForLikedPostsSQL: string = `
 select strftime('%Y-%m-%d', datetime(MAX(timestamp), 'unixepoch')) AS max_date
 from insta_liked_posts;
`;

export const filterLikedPostsBasedOnStartAndEndDateSQL: string = `
 select user, count(user) as counts
 from insta_liked_posts
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?)
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;

export const filterLikedPostsBasedOnUserAndStartAndEndDateSQL: string = `
 select user, count(user) as counts
 from insta_liked_posts
 where (? <= strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) and strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) <= ?) AND user == ?
 group by user
 having (count(user) > 0)
 order by count(user) desc  LIMIT 10;
`;