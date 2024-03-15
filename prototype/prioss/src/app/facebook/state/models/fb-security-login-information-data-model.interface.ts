import {
  AccountActivityModel,
  BrowserCookiesModel,
  EmailAddressVerificationModel,
  LastActivityModel,
  IPAddressActivityModel,
  LastLoginInformationModel,
  ActiveSessionsModel,
  LoginProtectionDataModel,
  LoginsAndLogoutsModel,
  MobileDeviceModel,
  RecentAccountRecoverySuccessesModel,
  RecognizedDevicesModel,
  AdminRecordsModel,
  AccountStatusChangesModel,
} from '../../models';
export default interface FbSecurityLoginInformationDataModelInterface {
  account_activity: AccountActivityModel;
  browser_cookies: BrowserCookiesModel;
  email_address_verifications: EmailAddressVerificationModel;
  facebook_activity_history: LastActivityModel;
  ip_address_activity: IPAddressActivityModel;
  last_login_information: LastLoginInformationModel;
  login_location: ActiveSessionsModel;
  login_protection_data: LoginProtectionDataModel;
  logins_and_logouts: LoginsAndLogoutsModel;
  mobile_devices: MobileDeviceModel;
  recent_account_recovery_successes: RecentAccountRecoverySuccessesModel;
  recognized_devices: RecognizedDevicesModel;
  record_details: AdminRecordsModel;
  account_status_changes: AccountStatusChangesModel;
}
