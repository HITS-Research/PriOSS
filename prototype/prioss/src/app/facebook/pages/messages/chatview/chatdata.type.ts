export interface ChatData {
    id: string;
    participants: string[];
    messages: ChatMessage[];
    name: string;
    is_groupchat: boolean;
    is_archived: boolean;
}
export interface ChatMessage {
    timestamp: number;
    sender: string;
    content: string;
    share?: { link: string };
    photos?: {uri: string, creation_timestamp: number}[];
    files?: {uri: string, creation_timestamp: number}[];
    sticker?: { uri: string, ai_stickers: [] };
}