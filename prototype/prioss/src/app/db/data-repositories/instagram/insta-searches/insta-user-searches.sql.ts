export const insertIntoInstaUserSearchesSQL = `
insert into insta_user_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaUserSearchesBaseSQL = `
insert into insta_user_searches
(search, timestamp)
`;

export const bulkAddInstaUserSearchesValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllFromInstaUserSearches = `
select *
  from insta_user_searches
 order by timestamp desc;
`