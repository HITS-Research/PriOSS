export interface ChatData{
    id: string;
    participants: string[];
    messages: ChatMessage[];
    name: string;
    is_groupchat: boolean;
    is_archived: boolean;
}
export interface ChatMessage{
    timestamp: number;
    sender: string;
    content: string;
}