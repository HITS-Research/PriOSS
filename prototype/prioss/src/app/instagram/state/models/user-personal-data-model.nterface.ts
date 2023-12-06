import {
    InstaAccountInfo,
    InstaBasedInInfo,
    InstaPersonalInfo,
    InstaProfessionalInfo,
    InstaProfileChange
} from "../../models";

export default interface InstaUserPersonalDataModel{
    personalInfo: InstaPersonalInfo;
    accountInfo: InstaAccountInfo;
    professionalInfo: InstaProfessionalInfo;
    basedInInfo: InstaBasedInInfo;
    profileChanges: InstaProfileChange[];
}
