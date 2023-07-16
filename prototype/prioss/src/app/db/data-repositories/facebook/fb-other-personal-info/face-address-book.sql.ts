/**
* Prepares SQL query to bulk add facebook address book data.
* 
*@param name the name of the person that should be added to the Facebook Address Book table
* @param contact the phone number of the person that should be added to the Facebook Address Book table
* @param created_timestamp the timestamp of the contact added that should be added to the Facebook Address Book table
*
* @author: Rishma (rishmamn@mail.upb.de)
*/

export const insertIntoFaceAddressBookSQL: string = `
insert into face_address_book
(name, contact_point, created_timestamp)
values 
(?, ?, ?);
`;

export const bulkAddFaceAddressBookBaseSQL: string = `
insert into face_address_book
(name, contact_point, created_timestamp)
`;

export const bulkAddFaceAddressBookValuesSQL: string = `
select ?, ?, ?
`;

export const bulkAddValueConnector: string = `
union all
`;
export const selectAllAddressBookData: string = `
 select id,
        name,
        contact_point,
        created_timestamp
  from face_address_book;
`;