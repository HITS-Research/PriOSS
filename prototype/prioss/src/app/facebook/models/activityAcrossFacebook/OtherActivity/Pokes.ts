/**{
  "pokes_v2": [
    {
      "poker": "Birgit Schutzengel",
      "pokee": "Marcia Husen",
      "rank": 1,
      "timestamp": 1511711740
    }
  ]
} */
export interface PokesModel {
  pokes_v2: PokesItem[];
}
export interface PokesItem {
  poker: string;
  pokee: string;
  rank: number;
  timestamp: number;
}
