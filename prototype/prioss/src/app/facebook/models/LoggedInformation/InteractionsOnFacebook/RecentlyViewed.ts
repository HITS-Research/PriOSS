/**{
	"recently_viewed": [
		{
			"name": "Videos und Serien",
			"description": "Videos und Shows, die du dir kÃ¼rzlich angesehen hast, und die Zeit, die du mit dem Ansehen verbracht hast.",
			"children": [
				{
					"name": "Shows",
					"description": "Eine Liste der Videos, die du dir angesehen hast",
					"entries": [
						{
							"timestamp": 1622395516,
							"data": {
								"uri": "https://www.facebook.com/redacted",
								"name": "The Pet Collectives Video: Raccoons"
							}
						}
					]
				},
				{
					"name": "Verbrachte Video-Zeit",
					"description": "So viel hast du von einem einzelnen Video angesehen",
					"entries": [
						{
							"timestamp": 1645469108,
							"data": {
								"uri": "https://www.facebook.com/redacted",
								"name": "The Dodos Video: Kitten Insists On Supervising Her Baby Sister's Bath Time Every Night",
								"watch_position_seconds": "35.381"
							}
						}
					]
				}
			]
		},
		{
			"name": "BeitrÃ¤ge, die dir im Feed angezeigt wurden",
			"description": "BeitrÃ¤ge, die dir in den letzten 90 Tagen in deinem Feed angezeigt wurden.",
			"entries": [
				{
					"timestamp": 1702745632,
					"data": {
						"name": "Nachdenkliche SprÃ¼che mit Bilders Beitrag: ",
						"uri": "https://www.facebook.com/redacted"
					}
				}
			]
		}
  ]
} */
export interface RecentlyViewedModel {
  recently_viewed: RecentlyViewedItem[];
}
export interface RecentlyViewedItem {
  name: string;
  description: string;
  children?: ChildrenItem[];
  entries?: EntriesItem[];
}
export interface ChildrenItem {
  name: string;
  description: string;
  entries?: EntriesItem[];
}
export interface EntriesItem {
  timestamp: number;
  data: DataItem;
}
export interface DataItem {
  uri: string;
  name: string;
  watch_position_seconds?: string;
}
