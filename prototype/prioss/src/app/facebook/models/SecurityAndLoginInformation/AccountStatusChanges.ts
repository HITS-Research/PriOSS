/**
{
    "account_status_changes_v2": [
      {
        "status": "Account reactivated",
        "timestamp": 1699277081
      },
      {
        "status": "Account deactivated",
        "timestamp": 1698277081
}]}
*/
export interface AccountStatusChangesModel {
  account_status_changes_v2: AccountStatusChangeItem[];
}
export interface AccountStatusChangeItem {
  status: string;
  timestamp: number;
}
