/**{
  "autofill_information_v2": {
    "EMAIL": [
      "marcia.husen@hotmail.de"
    ],
    "PHONE": [
      "+49123456789",
      "+49123456789"
    ],
    "GENDER": [
      "female"
    ],
    "FIRST_NAME": [
      "Marcia"
    ],
    "LAST_NAME": [
      "Husen"
    ],
    "FULL_NAME": [
      "Marcia Husen"
    ],
    "WORK_EMAIL": [
      "husen.marcia@hotmail.de"
    ],
    "WORK_PHONE": [
      "+49123456789",
      "+49123456789"
    ]
  }
} */
export interface AutofillInformationModel {
  autofill_information_v2: {
    EMAIL: string[];
    PHONE: string[];
    GENDER: string[];
    FIRST_NAME: string[];
    LAST_NAME: string[];
    FULL_NAME: string[];
    WORK_EMAIL: string[];
    WORK_PHONE: string[];
  };
}
