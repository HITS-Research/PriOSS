export const insertIntoInstaTagSearchesSQL = `
insert into insta_tag_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaTagSearchesBaseSQL = `
insert into insta_tag_searches
(search, timestamp)
`;

export const bulkAddInstaTagSearchesValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllFromInstaTagSearches = `
select *
  from insta_tag_searches
 order by timestamp desc;
`