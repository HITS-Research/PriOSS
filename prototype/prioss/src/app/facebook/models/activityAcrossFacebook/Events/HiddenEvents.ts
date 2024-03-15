/** {
    "events_hidden_v2": [
      {
        "timestamp": 1345928400,
        "data": [
          
        ],
        "title": "Marcia Husen hat 1yr TiLT//ON AND ON_MONOLOC (clr.net) verborgen."
      }
    ]
} */
export interface EventsHiddenModel {
  events_hidden_v2: EventsHiddenItem[];
}
export interface EventsHiddenItem {
  timestamp: number;
  data: any[];
  title: string;
}
