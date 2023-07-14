/**
* Prepares SQL query to bulk add facebook post data.
* 
* @param title the type of the post.
* @param timestamp the timestamp of the post.
*
* @author: Rashida (rbharmal@mail.upb.de)
*/

export const insertIntoFacePostsSQL: string = `
insert into face_posts
(timestamp,title)
values 
(?, ?);
`;

export const bulkAddFacePostsBaseSQL: string = `
insert into face_posts
(timestamp,title)
`;

export const bulkAddFacePostsValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllPostsData: string = `
 select id,
        timestamp,
        title
  from face_posts;
`;