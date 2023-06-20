export const insertIntoInstaRemovedSuggestionInfoSQL: string = `
  insert into insta_removed_suggestion_info
  (instaProfileURL, instaAccountName, timestamp)
  values 
  (?, ?, ?);
`;

export const selectRemovedSuggestionInfo: string = `
select instaProfileURL,
       instaAccountName,
       timestamp 
    from insta_removed_suggestion_info;
`;

export const insertRemovedSuggestionSQL: string = `
insert into insta_removed_suggestion_info
(instaProfileURL, instaAccountName, timestamp)
values 
(?, ?, ?);
`;

export const bulkAddInstaRemovedSuggestionBaseSQL: string = `
insert into insta_removed_suggestion_info
(instaProfileURL, instaAccountName, timestamp)
`;

export const bulkAddRemovedSuggestionValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;