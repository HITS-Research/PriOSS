/**[
	{
		"timestamp": 1699721508,
		"media": [],
		"label_values": [
			{
				"label": "Aktualisiert am",
				"timestamp_value": 1701872716
			}
		]
	},
	{
		"timestamp": 1699721508,
		"media": [],
		"label_values": [
			{
				"label": "Aktualisiert am",
				"timestamp_value": 1701872716
			}
		]
  }
] */
export interface MetaAvatarPostBackgroundModel {
  timestamp: number;
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  timestamp_value?: number;
  value?: string;
  vec?: VecItem[];
}
export interface VecItem {
  timestamp_value: number;
}
