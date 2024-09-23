import YouTubeUserDataModel from "./models/youtube-user-data.model";

export class UpdateYouTubeUserData {
  static readonly type = '[YouTube] Update User';
  constructor(public userData: YouTubeUserDataModel) {}
}

export class ResetYouTubeUserData {
  static readonly type = '[YouTube] Reset User';
}
