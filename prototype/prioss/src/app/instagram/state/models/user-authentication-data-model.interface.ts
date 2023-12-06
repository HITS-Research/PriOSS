import {InstaLoginInfo, InstaLogoutInfo, InstaSignUpInfo} from "../../models";


export default interface InstaUserAuthenticationDataModel {
    signUpInfo: InstaSignUpInfo;
    loginInfo: InstaLoginInfo[];
    logoutInfo: InstaLogoutInfo[];
}
