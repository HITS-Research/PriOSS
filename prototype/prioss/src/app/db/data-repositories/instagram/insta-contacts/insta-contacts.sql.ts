export const insertIntoInstaContactsSQL: string = `
insert into insta_contacts
(first_name, surname, contact_information, imported_time)
values 
(?, ?, ?, ?);
`;

export const bulkAddInstaContactsBaseSQL: string = `
insert into insta_contacts 
(first_name, surname, contact_information, imported_time)
`;

export const bulkAddInstaContactsValuesSQL: string = `
select ?, ?, ?, ?
`;

export const bulkAddValueConnectorForContacts: string = `
union all
`;

export const selectContactsSQL: string=`
select first_name, surname, contact_information, imported_time from insta_contacts;
`;