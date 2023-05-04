export const insertIntoUserdata: string = `
  insert into userdata
  (username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime)
  values 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const selectAllUserdata: string = `
 select username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime
   from userdata;
`;