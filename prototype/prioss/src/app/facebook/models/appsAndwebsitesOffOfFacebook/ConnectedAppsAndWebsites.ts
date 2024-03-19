/**{
    "installed_apps_v2": [
      {
        "name": "redacted",
        "added_timestamp": 0,
        "user_app_scoped_id": "1111111111111111",
        "category": "removed",
        "removed_timestamp": 0
      }
    ]
  } */
export interface ConnectedAppsAndWebsitesModel {
  installed_apps_v2: InstalledAppsItem[];
}
export interface InstalledAppsItem {
  name: string;
  added_timestamp: number;
  user_app_scoped_id: string;
  category: string;
  removed_timestamp: number;
}
