export const insertIntoInstaTagSearchesSQL: string = `
insert into insta_tag_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaTagSearchesBaseSQL: string = `
insert into insta_tag_searches
(search, timestamp)
`;

export const bulkAddInstaTagSearchesValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllFromInstaTagSearches: string = `
select *
  from insta_tag_searches
 order by timestamp desc;
`