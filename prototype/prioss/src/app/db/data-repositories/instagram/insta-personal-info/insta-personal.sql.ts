export const insertIntoInstaPersonalInfoSQL = `
  insert into insta_personal_info
  (username, email, birthdate, gender)
  values 
  (?, ?, ?, ?);
`;

export const insertIntoInstaAccountInfoSQL = `
  insert into insta_account_info
  (contact_syncing, first_country_code, has_shared_live_video, last_login, last_logout, first_story_time, last_story_time, first_close_friends_story_time)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?);
`;

export const insertIntoInstaProfessionalInfoSQL = `
  insert into insta_professional_info
  (title)
  values 
  (?);
`;

export const insertIntoInstaProfileChangesSQL = `
  insert into insta_profile_changes
  (title, changed, previous_value, new_value, change_date)
  values 
  (?, ?, ?, ?, ?);
`;

export const selectPersonalInfo = `
  select username,
         email,
         birthdate,
         gender
    from insta_personal_info;
`;

export const selectAccountInfo = `
  select contact_Syncing,
         first_country_code,
         has_shared_live_video,
         last_login,
         last_logout,
         first_story_time,
         last_story_time,
         first_close_friends_story_time
    from insta_account_info;
`;

export const selectProfessionalInfo = `
  select title
    from insta_professional_info;
`;

export const selectProfileChanges = `
  select title,
         changed,
         previous_value,
         new_value,
         change_date
    from insta_profile_changes;
`;