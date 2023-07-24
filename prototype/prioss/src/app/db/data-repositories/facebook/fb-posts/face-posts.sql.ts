/**
* Prepares SQL query to bulk add facebook post data.
* 
* @param title the type of the post.
* @param timestamp the timestamp of the post.
*
* @author: Rashida (rbharmal@mail.upb.de)
*/

export const insertIntoFacePostsSQL = `
insert into face_posts
(timestamp,title)
values 
(?, ?);
`;

export const bulkAddFacePostsBaseSQL = `
insert into face_posts
(timestamp,title)
`;

export const bulkAddFacePostsValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllPostsData = `
 select id,
        timestamp,
        title
  from face_posts;
`;