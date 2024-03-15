/**{
  "accounts_center_v2": {
    "linked_accounts": [
      {
        "service_name": "Instagram",
        "username": "marcia",
        "email": "husen.marcia@hotmail.de",
        "name": "Marcia Husen"
      },
      {
        "service_name": "Facebook",
        "username": "marcia.husen.5",
        "email": "husen.marcia@hotmail.de",
        "phone_number": "+49123456789",
        "name": "Marcia Husen"
      }
    ]
  }
} */
export interface AccountsCenterModel {
  accounts_center_v2: AccountsCenterItem;
}
export interface AccountsCenterItem {
  linked_accounts: LinkedAccount[];
}
export interface LinkedAccount {
  service_name: string;
  username: string;
  email: string;
  name: string;
  phone_number?: string;
}
