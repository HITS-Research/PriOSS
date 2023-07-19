/**
* Prepares SQL query to bulk add facebook address book data.
* 
*@param name the name of the person that should be added to the Facebook Address Book table
* @param contact the phone number of the person that should be added to the Facebook Address Book table
* @param created_timestamp the timestamp of the contact added that should be added to the Facebook Address Book table
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceAddressBookSQL = `
insert into face_address_book
(name, contact_point, created_timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceAddressBookBaseSQL = `
insert into face_address_book
(name, contact_point, created_timestamp)
`;

export const bulkAddFaceAddressBookValuesSQL = `
select ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;
export const selectAllAddressBookData = `
 select id,
        name,
        contact_point,
        created_timestamp
  from face_address_book;
`;