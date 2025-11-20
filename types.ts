export enum Channel {
  WHATSAPP = 'WhatsApp',
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  EMAIL = 'Email',
  SMS = 'SMS'
}

export enum Circle {
  FAMILY = 'Family',
  CLOSE_FRIENDS = 'Close Friends',
  WORK = 'Work',
  ACQUAINTANCES = 'Acquaintances'
}

export enum UpdateType {
  POST = 'post',
  MESSAGE = 'message',
  EVENT = 'event',
  REQUEST = 'request'
}

export interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  circle: Circle;
  channels: Channel[];
}

export interface SocialUpdate {
  id: string;
  contactId: string;
  type: UpdateType;
  channel: Channel;
  content: string;
  timestamp: string; // ISO string
  imageUrl?: string;
  summary?: string; // AI generated summary
  priorityScore: number; // 0-100, determined by AI/System
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  relatedUpdate?: SocialUpdate; // New field for rich cards
  replySuggestions?: string[]; // New field for interaction
}

export interface UserPreferences {
  tone: 'casual' | 'formal' | 'excited';
  emojiUsage: 'none' | 'minimal' | 'heavy';
  forbiddenWords: string[];
}