/**{
  "media": [
    
  ],
  "label_values": [
    {
      "label": "Du kannst ein Reel in einer Story teilen",
      "value": "Richtig"
    },
    {
      "label": "Deine Reels k\u00c3\u00b6nnen von der \u00c3\u0096ffentlichkeit f\u00c3\u00bcr einen Remix verwendet werden",
      "value": "Falsch"
    }
  ]
} */
export interface ReelsPreferenceModel {
  media: any[];
  label_values: {
    label: string;
    value: string;
  }[];
}
