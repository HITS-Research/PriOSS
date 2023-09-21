export const insertIntoInstaRemovedSuggestionInfoSQL = `
  insert into insta_removed_suggestion_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRemovedSuggestionInfo = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_removed_suggestion_info;
`;

export const insertRemovedSuggestionSQL = `
insert into insta_removed_suggestion_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRemovedSuggestionBaseSQL = `
insert into insta_removed_suggestion_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddRemovedSuggestionValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;