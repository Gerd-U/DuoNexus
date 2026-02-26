export type MessageSender = 'user' | 'contact';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  isSystemNote?: boolean;
}

export interface ChatContact {
  id: string;
  summonerName: string;
  rank: string;
  role: string;
  championEmoji: string;
  avatarGradient: string;
  lastMessage: string;
  lastTime: string;
  isOnline: boolean;
  messages: ChatMessage[];
}