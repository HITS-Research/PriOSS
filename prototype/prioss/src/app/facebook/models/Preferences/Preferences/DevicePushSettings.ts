/**[
  {
    media: [],
    label_values: [
      {
        label: 'Aktualisiert am',
        timestamp_value: 1661444595,
      },
      {
        label: 'Status der Autorisierung',
      },
    ],
  },
]; */
export interface DevicePushSettingModel {
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
