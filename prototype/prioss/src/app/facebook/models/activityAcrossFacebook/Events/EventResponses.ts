/** {
    "event_responses_v2": {
      "events_joined": [
        {
          "name": "PAROOKAVILLE 2022",
          "start_timestamp": 165849123456789,
          "end_timestamp": 1658613600
        }
        ]
    }
} */
export interface EventResponsesModel {
  event_responses_v2: EventResponses;
}
export interface EventResponses {
  events_joined: EventResponsesItem[];
}
export interface EventResponsesItem {
  name: string;
  start_timestamp: number;
  end_timestamp: number;
}
