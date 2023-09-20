export interface InstaChatPartnerData {
  id?: string;
  sender: string;
  messages: number;
  avg: number;
  text: number;
  share: number;
  audio: number;
  photos: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  chat_id?: string;
}

export interface InstaChatData {
  id?: string;
  chat: string;
  yourMessages: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  otherMessages: InstaChatPartnerData[];
}
