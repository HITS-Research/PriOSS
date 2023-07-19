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
  (business_information)
  values 
  (?);
`;

export const insertIntoBasedIn: string = `
  insert into insta_based_in
  (account_based_in)
  values 
  (?);
`;

export const insertIntoInstaProfileChangesSQL: string = `
  insert into insta_profile_changes
  (title, changed, previous_value, new_value, change_date)
  values 
  (?, ?, ?, ?, ?);
`;

export const selectPersonalInfo: string = `
  select username,
         email,
         birthdate,
         gender
    from insta_personal_info;
`;

export const selectAccountInfo: string = `
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

export const selectProfessionalInfo: string = `
  select business_information
    from insta_professional_info;
`;

export const selectBasedIn: string = `
  select account_based_in
    from insta_based_in;
`;

export const selectProfileChanges: string = `
  select title,
         changed,
         previous_value,
         new_value,
         change_date
    from insta_profile_changes;
`;