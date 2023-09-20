export const insertIntoInstaChatDataInfoSQL = `
  insert into insta_chat_data_info
  (chat, yourMessages, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const selectInstaChatDataInfo = `
  select 
    id,
    chat,
    yourMessages,
    monday, 
    tuesday, 
    wednesday, 
    thursday, 
    friday, 
    saturday, 
    sunday       
  from insta_chat_data_info;
`;

export const bulkAddInstaChatDataBaseSQL = `
  insert into insta_chat_data_info
  (chat, yourMessages, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
`;

export const bulkAddInstaChatDataValuesSQL = `
select ?, ?, ?, ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
