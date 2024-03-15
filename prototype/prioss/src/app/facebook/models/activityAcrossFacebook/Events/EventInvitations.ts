/** {
    "events_invited_v2": [
      {
        "name": "Bierk\u00c3\u00b6nigschie\u00c3\u009fen Berlin 2019",
        "start_timestamp": 1569070800,
        "end_timestamp": 0
      }
    ]
  } */
export interface EventsInvitedModel {
  events_invited_v2: EventsInvitedItem[];
}
export interface EventsInvitedItem {
  name: string;
  start_timestamp: number;
  end_timestamp: number;
}
