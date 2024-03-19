/**
 * {
 *    "media": [],
 *    "label_values": [
 *        {"label": "", "value": ""},
 *        {"label": "", "vec": []},
 *        {"label": "", "dict": []}
 *    ]
 * }
 */
export interface AdPreferencesModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  value?: string;
  vec?: VecItem[];
  dict?: DictItem[];
  timestamp_value?: number;
}
export interface VecItem {
  timestamp_value: number;
}
export interface DictItem {
  key: string;
  value: string;
}
