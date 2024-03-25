/**{
  "profile_v2": {
    "name": {
      "full_name": "Linda Smith",
      "first_name": "Linda",
      "middle_name": "",
      "last_name": "Smith"
    },
    "emails": {
      "emails": [
        "smith.linda@hotmail.de"
      ],
      "previous_emails": [
        "linda.smith.5@facebook.com"
      ],
      "pending_emails": [
        
      ],
      "ad_account_emails": [
        
      ]
    },
    "birthday": {
      "year": 1990,
      "month": 10,
      "day": 1
    },
    "gender": {
      "gender_option": "FEMALE",
      "pronoun": "FEMALE"
    },
    "previous_names": [
      
    ],
    "other_names": [
      
    ],
    "relationship": {
      "status": "",
      "timestamp": 1622398709
    },
    "previous_relationships": [
      {
        "name": "John Doe",
        "timestamp": 0
      },
      {
        "name": "Jane Doe",
        "timestamp": 0
      }
    ],
    "family_members": [
      {
        "name": "Emily Brown",
        "relation": "Cousin",
        "timestamp": 1451392726
      },
      {
        "name": "Sophie Wilson",
        "relation": "Niece",
        "timestamp": 1400149123456789
      }
    ],
    "education_experiences": [
      {
        "name": "Hilltop High School",
        "end_timestamp": 1293868800,
        "graduated": true,
        "concentrations": [
          
        ],
        "school_type": "School",
        "timestamp": 1298933334
      }
    ],
    "work_experiences": [
      
    ],
    "blood_info": {
      "blood_donor_status": "unregistered"
    },
    "websites": [
      
    ],
    "phone_numbers": [
      {
        "phone_type": "Mobile",
        "phone_number": "+49123456789",
        "verified": true,
        "creation_time": 1384519842
      },
      {
        "phone_type": "Mobile",
        "phone_number": "+49123456789",
        "verified": true,
        "creation_time": 1390636068
      }
    ],
    "registration_timestamp": 127203527
} */
export interface ProfileInformationModel {
  profile_v2: {
    name: {
      full_name: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    };
    emails: {
      emails: string[];
      previous_emails: string[];
      pending_emails: string[];
      ad_account_emails: string[];
    };
    birthday: {
      year: number;
      month: number;
      day: number;
    };
    gender: {
      gender_option: string;
      pronoun: string;
    };
    previous_names: string[];
    other_names: string[];
    relationship: {
      status: string;
      timestamp: number;
    };
    previous_relationships: {
      name: string;
      timestamp: number;
    }[];
    family_members: {
      name: string;
      relation: string;
      timestamp: number;
    }[];
    education_experiences: {
      name: string;
      end_timestamp: number;
      graduated: boolean;
      concentrations: string[];
      school_type: string;
      timestamp: number;
    }[];
    work_experiences: any[];
    blood_info: {
      blood_donor_status: string;
    };
    websites: any[];
    phone_numbers: {
      phone_type: string;
      phone_number: string;
      verified: boolean;
      creation_time: number;
    }[];
    registration_timestamp: number;
  };
}
