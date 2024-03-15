/**{
  "language_and_locale_v2": [
    {
      "name": "Spracheinstellungen",
      "description": "Deine Spracheinstellungen",
      "children": [
        {
          "name": "Ausgew\u00c3\u00a4hlte Sprache",
          "description": "Die Sprache, die du f\u00c3\u00bcr dein Facebook-Profil festgelegt hast",
          "entries": [
            {
              "data": {
                "value": "de_DE"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Sprachen, die du vielleicht sprichst",
      "description": "Sprachen, die du vielleicht sprichst \u00e2\u0080\u0093 basierend auf deinen Aktivit\u00c3\u00a4ten auf Facebook",
      "entries": [
        {
          "data": {
            "value": "de"
          }
        }
      ]
    }
  ]
} */
export interface LanguageAndLocalesModel {
  language_and_locale_v2: {
    name: string;
    description: string;
    children?: {
      name: string;
      description: string;
      entries: {
        data: {
          value: string;
        };
      }[];
    }[];
    entries?: {
      data: {
        value: string;
      };
    }[];
  }[];
}
