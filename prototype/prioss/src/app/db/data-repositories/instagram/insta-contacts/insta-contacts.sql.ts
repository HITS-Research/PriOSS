export const insertIntoInstaContactsSQL: string = `
insert into insta_contacts
(first_name, surname, contact_information)
values 
(?, ?, ?);
`;

export const bulkAddInstaContactsBaseSQL: string = `
insert into insta_contacts 
(first_name, surname, contact_information)
`;

export const bulkAddInstaContactsValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnectorForContacts: string = `
union all
`;

export const selectContactsSQL: string=`
select first_name, surname, contact_information from insta_contacts;
`;