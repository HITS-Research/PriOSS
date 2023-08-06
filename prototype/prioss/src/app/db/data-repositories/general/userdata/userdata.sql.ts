export const insertIntoUserdata = `
  insert into userdata
  (username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const selectAllUserdata = `
 select username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime
   from userdata;
`;