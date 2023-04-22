export const insertIntoInstaPersonalInfoSQL: string = `
  insert into insta_personal_info
  (username, email, birthdate, gender)
  values 
  (?, ?, ?, ?);
`;

export const insertIntoInstaAccountInfoSQL: string = `
  insert into insta_account_info
  (contact_syncing, first_country_code, has_shared_live_video, last_login, last_logout, first_story_time, last_story_time, first_close_friends_story_time)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?);
`;

export const insertIntoInstaProfessionalInfoSQL: string = `
  insert into insta_professional_info
  (title)
  values 
  (?);
`;

export const insertIntoInstaProfileChangesSQL: string = `
  insert into insta_profile_changes
  (title, changed, previous_value, new_value, change_date)
  values 
  (?, ?, ?, ?, ?);
`;