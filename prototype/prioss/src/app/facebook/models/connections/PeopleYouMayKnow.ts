/**{
    "media": [
      
    ],
    "label_values": [
      {
        "label": "Freundschaftsvorschl\u00c3\u00a4ge",
        "vec": [
          {
            "value": "Alina Christin"
          },
          {
            "value": "Jolanda Reimer"
          }
        ]
      }
    ]
  } */
export interface PeopleYouMayKnowModel {
  media: any[];
  label_values: LabelValueItem[];
}
export interface LabelValueItem {
  label: string;
  vec: Vec[];
}
export interface Vec {
  value: string;
}
