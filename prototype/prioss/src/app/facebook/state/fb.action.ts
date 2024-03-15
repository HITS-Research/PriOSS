import { FbUserDataModel } from './models';

export class ResetFbUserData {
  static readonly type = '[Fb] Reset User';
  constructor() {}
}

export class UpdateFbUserData {
  static readonly type = '[Fb] Update User';
  constructor(public user_data: FbUserDataModel) {}
}
