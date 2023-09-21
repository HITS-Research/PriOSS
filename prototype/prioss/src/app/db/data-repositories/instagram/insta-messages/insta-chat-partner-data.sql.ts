export const insertIntoChatPartnerDataInfoSQL = `
  insert into insta_chat_partner_data_info
  (sender, messages, avg, text, share, audio, photos, monday, tuesday, wednesday, thursday, friday, saturday, sunday, chat_id)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const selectChatPartnerDataInfo = `
  select 
    sender, 
    messages, 
    avg, 
    text, 
    share, 
    audio, 
    photos, 
    monday, 
    tuesday, 
    wednesday, 
    thursday, 
    friday, 
    saturday, 
    sunday,
    chat_id
  from insta_chat_partner_data_info;
`;

export const bulkAddChatPartnerDataBaseSQL = `
  insert into insta_chat_partner_data_info
  (sender, messages, avg, text, share, audio, photos, monday, tuesday, wednesday, thursday, friday, saturday, sunday, chat_id)
`;

export const bulkAddChatPartnerDataValuesSQL = `
select ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
