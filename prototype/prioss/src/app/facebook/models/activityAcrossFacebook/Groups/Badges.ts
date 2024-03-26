/**{
    "group_badges_v2": {
      "groupname": [
        "grouprole"
      ]
    }
  } */
export interface GroupBadgesModel {
  group_badges_v2: GroupBadges;
}
export interface GroupBadges {
  [key: string]: string[];
}
