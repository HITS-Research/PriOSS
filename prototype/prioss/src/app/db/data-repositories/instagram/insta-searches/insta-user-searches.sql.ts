export const insertIntoInstaUserSearchesSQL: string = `
insert into insta_user_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaUserSearchesBaseSQL: string = `
insert into insta_user_searches
(search, timestamp)
`;

export const bulkAddInstaUserSearchesValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;

export const selectAllFromInstaUserSearches: string = `
select *
  from insta_user_searches;
`