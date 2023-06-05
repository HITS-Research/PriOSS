export const insertIntoInstaKeywordSearchesSQL: string = `
insert into insta_user_searches
(search, timestamp)
values 
(?, ?);
`;

export const bulkAddInstaKeywordSearchesBaseSQL: string = `
insert into insta_user_searches
(search, timestamp)
`;

export const bulkAddInstaKeywordSearchesValuesSQL: string = `
select ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;