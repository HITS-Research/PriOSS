import InstaUserDataModel from "./models/insta-user-data-model.interface";

export class UpdateInstaUserData {
    static readonly type = '[Insta] Update User';
    constructor(public userData: InstaUserDataModel) {}
}
export class ResetInstaUserData {
    static readonly type = '[Insta] Reset User';
    constructor() {}
}
