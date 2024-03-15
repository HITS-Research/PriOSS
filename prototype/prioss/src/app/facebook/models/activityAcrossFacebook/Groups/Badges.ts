/**{
    "group_badges_v2": {
      "WHG '11": [
        "Admin"
      ]
    }
  } */
export interface GroupBadgesModel {
  group_badges_v2: GroupBadges;
}
export interface GroupBadges {
  [key: string]: string[];
}
