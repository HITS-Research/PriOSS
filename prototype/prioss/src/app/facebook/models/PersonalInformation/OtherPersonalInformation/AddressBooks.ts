/**{
  "address_book_v2": {
    "address_book": [
      {
        "name": "Elmar Müller",
        "details": [
          {
            "contact_point": "+49123456789"
          }
        ],
        "created_timestamp": 1530429889,
        "updated_timestamp": 1533839699
      }
    ]
  }
} */
export interface AddressBookModel {
  address_book_v2: AddressBook;
}
export interface AddressBook {
  address_book: AddressBookItem[];
}
export interface AddressBookItem {
  name: string;
  details: AddressBookDetail[];
  created_timestamp: number;
  updated_timestamp: number;
}
export interface AddressBookDetail {
  contact_point: string;
}
