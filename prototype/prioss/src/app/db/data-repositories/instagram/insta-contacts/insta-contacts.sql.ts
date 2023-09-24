export const insertIntoInstaContactsSQL = `
insert into insta_contacts
(firstName, surname, contactInformation)
values 
(?, ?, ?);
`;

export const bulkAddInstaContactsBaseSQL = `
insert into insta_contacts 
(firstName, surname, contactInformation)
`;

export const bulkAddInstaContactsValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnectorForContacts = `
union all
`;

export const selectContactsSQL=`
select firstName, surname, contactInformation 
  from insta_contacts
 order by surname;
`;