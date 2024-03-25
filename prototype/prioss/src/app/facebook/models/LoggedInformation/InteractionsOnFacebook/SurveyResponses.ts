/**{
  "ace_survey_responses_v2": [
    {
      "rating": "satisfied",
      "raw_timestamp": 1603302561,
      "user_name": "Marcia Husen",
      "business_name": "Objkts Jewelry",
      "questionnaire_data": [
        "product_quality"
      ]
    }
  ]
} */

export interface SurveyResponseModel {
  ace_survey_responses_v2: SurveyResponseItem[];
}
export interface SurveyResponseItem {
  rating: string;
  raw_timestamp: number;
  user_name: string;
  business_name: string;
  questionnaire_data: string[];
}
