/**{
  "profile_updates_v2": [
    {
      "timestamp": 1272563897,
      "title": "Marcia Husen added M\u00c3\u00bcnster to her Profil."
    }
  ]
} */
export interface ProfileUpdateModel {
  profile_updates_v2: ProfileUpdatesItem[];
}
export interface ProfileUpdatesItem {
  timestamp: number;
  title: string;
}
