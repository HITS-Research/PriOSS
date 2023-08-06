export const insertIntoInstaKeywordSearchesSQL = `
insert into insta_keyword_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaKeywordSearchesBaseSQL = `
insert into insta_keyword_searches
(search, timestamp)
`;

export const bulkAddInstaKeywordSearchesValuesSQL = `
select ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const selectAllFromInstaKeywordSearches = `
select *
  from insta_keyword_searches
 order by timestamp desc;
`