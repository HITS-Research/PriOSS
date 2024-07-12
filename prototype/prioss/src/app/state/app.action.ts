export class SetNetworkStatus {
  static readonly type = '[App] Set Network Status';
  constructor(public networkStatus: boolean) {}
}
