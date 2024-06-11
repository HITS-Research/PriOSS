export default interface InstaUserMessageDataModel {
  participants: string[];
  messages:Messages[];
  title:string;
}

export interface Messages {
  sender:string;
  message:string;
  timestamp:number;
  isMessageDeleted:boolean;
  contentLink:string;
}
