
export default interface YouTubeChatData{
  chatId:string;
  channelId:string;
  videoId:string;
  timestamp:string;
  price:string;
  message:string;
}
export interface YouTubeMessageDataModel {
  participants: string[];
  messages:YouTubeChatData[];
  title:string;
}
