/**
* Prepares SQL query to bulk add facebook post data.
* 
* @param title the type of the post.
* @param timestamp the timestamp of the post.
* @param post information
*
* @author: Rashida (rbharmal@mail.upb.de)
*/

export const insertIntoFacePostsSQL = `
insert into face_posts
(timestamp,title,post)
values 
(?, ?, ?);
`;

export const bulkAddFacePostsBaseSQL = `
insert into face_posts
(timestamp,title,post)
`;

export const bulkAddFacePostsValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllPostsData = `
 select id,
        timestamp,
        title,
        post
  from face_posts;
`;