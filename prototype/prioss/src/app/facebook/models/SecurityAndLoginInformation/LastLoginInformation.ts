/**
{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Zeitpunkt der letzten Anmeldung",
      "timestamp_value": 1702744686
    },
    {
      "label": "Anmeldeinformationstyp beim letzten Anmeldeversuch",
      "dict": [
        {
          "timestamp_value": 1702744686
        }
      ]
    }
  ]
}
*/
export interface LastLoginInformationModel {
  media: any[];
  label_values: LastLoginInformationLabelValue[];
}
export interface LastLoginInformationLabelValue {
  label: string;
  timestamp_value?: number;
  dict?: LastLoginInformationDict[];
}
export interface LastLoginInformationDict {
  timestamp_value: number;
}
