import { Channel, Circle, Contact, SocialUpdate, UpdateType } from './types';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Hardik',
    avatarUrl: 'https://picsum.photos/seed/hardik/200/200',
    circle: Circle.CLOSE_FRIENDS,
    channels: [Channel.INSTAGRAM, Channel.WHATSAPP]
  },
  {
    id: 'c2',
    name: 'Arpit',
    avatarUrl: 'https://picsum.photos/seed/arpit/200/200',
    circle: Circle.CLOSE_FRIENDS,
    channels: [Channel.WHATSAPP]
  },
  {
    id: 'c3',
    name: 'Mom',
    avatarUrl: 'https://picsum.photos/seed/mom/200/200',
    circle: Circle.FAMILY,
    channels: [Channel.WHATSAPP, Channel.EMAIL]
  },
  {
    id: 'c4',
    name: 'Rashi',
    avatarUrl: 'https://picsum.photos/seed/rashi/200/200',
    circle: Circle.CLOSE_FRIENDS,
    channels: [Channel.WHATSAPP, Channel.SMS]
  },
  {
    id: 'c5',
    name: 'Dad',
    avatarUrl: 'https://picsum.photos/seed/dad/200/200',
    circle: Circle.FAMILY,
    channels: [Channel.EMAIL]
  }
];

export const INITIAL_UPDATES: SocialUpdate[] = [
  {
    id: 'u1',
    contactId: 'c1',
    type: UpdateType.POST,
    channel: Channel.INSTAGRAM,
    content: "Just posted from his recent trip to Ladakh, check the pictures it looks amazing.",
    imageUrl: "https://picsum.photos/seed/ladakh/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    priorityScore: 95,
    isRead: false
  },
  {
    id: 'u2',
    contactId: 'c2',
    type: UpdateType.MESSAGE,
    channel: Channel.WHATSAPP,
    content: "Shared his new scooter purchase picture in your 'School Buddies' group.",
    imageUrl: "https://picsum.photos/seed/scooter/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    priorityScore: 88,
    isRead: false
  },
  {
    id: 'u3',
    contactId: 'c3',
    type: UpdateType.MESSAGE,
    channel: Channel.WHATSAPP,
    content: "Sent you their new dish that they made. 'Look at this Paneer Tikka we tried!'",
    imageUrl: "https://picsum.photos/seed/food/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    priorityScore: 90,
    isRead: false
  },
  {
    id: 'u4',
    contactId: 'c4',
    type: UpdateType.REQUEST,
    channel: Channel.WHATSAPP,
    content: "Is asking if she can use your card to pay for her appointment.",
    imageUrl: "https://picsum.photos/seed/clinic/600/400",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    priorityScore: 99,
    isRead: false
  }
];

export const CHART_DATA = [
  { name: 'Mon', interactions: 12 },
  { name: 'Tue', interactions: 19 },
  { name: 'Wed', interactions: 3 },
  { name: 'Thu', interactions: 5 },
  { name: 'Fri', interactions: 22 },
  { name: 'Sat', interactions: 30 },
  { name: 'Sun', interactions: 15 },
];