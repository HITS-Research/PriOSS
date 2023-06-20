export const insertIntoInstaKeywordSearchesSQL: string = `
insert into insta_keyword_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaKeywordSearchesBaseSQL: string = `
insert into insta_keyword_searches
(search, timestamp)
`;

export const bulkAddInstaKeywordSearchesValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllFromInstaKeywordSearches: string = `
select *
  from insta_keyword_searches
 order by timestamp desc;
`