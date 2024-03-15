/**
{
  "contact_verifications_v2": [
    {
      "contact": "husen.marcia@hotmail.de",
      "contact_type": 2,
      "verification_time": 1272035278
    }
  ]
}
*/

export interface EmailAddressVerificationModel {
  contact_verifications_v2: ContactVerification[];
}

export interface ContactVerification {
  contact: string;
  contact_type: number;
  verification_time: number;
}
