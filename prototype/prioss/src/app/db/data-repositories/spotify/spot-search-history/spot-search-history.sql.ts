export const insertIntoSpotSearchHistorySQL = `
  insert into spot_search_history
  (platform, searchTime, searchQuery)
  values
  (?, ?, ?);
`;

export const bulkAddSpotSearchHistoryBaseSQL = `
  insert into spot_search_history
  (platform, searchTime, searchQuery)
`;

export const bulkAddSpotSearchHistoryValuesSQL = `
  select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const insertTestSearchHistory = `
insert into spot_search_history
(platform, searchTime, searchQuery)
values
('Android', '2022-09-22T04:45:54.424Z[UTC]', 'lol');

insert into spot_history
(platform, searchTime, searchQuery)
values
('AppleIsAplatform', '2022-09-22T04:45:54.424Z[UTC]', 'twenty One Pilots');
`;

export const selectAllSpotSearchHistory = `
 select id, 
      platform,
      searchTime,
      searchQuery
   from spot_search_history;
`;

export const getQueryCount = `
 select count(*) as search_query_count
 from spot_search_history;
`;

export const selectAllFromSpotSearches = `
select *
  from spot_search_history
 order by searchTime desc;
`