export const insertIntoInstaContactsSQL: string = `
insert into insta_contacts
(firstName, surname, contactInformation)
values 
(?, ?, ?);
`;

export const bulkAddInstaContactsBaseSQL: string = `
insert into insta_contacts 
(firstName, surname, contactInformation)
`;

export const bulkAddInstaContactsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnectorForContacts: string = `
union all
`;

export const selectContactsSQL: string=`
select firstName, surname, contactInformation 
  from insta_contacts
 order by surname;
`;