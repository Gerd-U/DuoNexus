import type { ChatContact } from "../models/messages.models";


const CHATS_DATA: ChatContact[] = [
  {
    id: '1',
    summonerName: 'BestLulueUW',
    rank: 'Oro I',
    role: 'Support',
    championEmoji: '🧚',
    avatarGradient: 'from-purple-600 to-pink-500',
    lastMessage: '¡¡ Último mensaje! Hola...',
    lastTime: '09:45',
    isOnline: true,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Hola! He visto que buscas ADC, yo soy main Jhin.',
        timestamp: '09:40',
      },
      {
        id: 'm2',
        sender: 'user',
        content: '¿Jugamos una clasificatoria?',
        timestamp: '09:41',
      },
      {
        id: 'm3',
        sender: 'contact',
        content: '¡Hola! Claro, Jhin va genial. Soy M7 con Lulu.',
        timestamp: '09:43',
      },
      {
        id: 'm4',
        sender: 'contact',
        content: 'Mi nick es BestLulueUW, envíame solicitud.',
        timestamp: '09:44',
      },
      {
        id: 'm5',
        sender: 'user',
        content: 'Vale, te la envío. :)',
        timestamp: '09:45',
      },
      {
        id: 'm6',
        sender: 'user',
        content: 'Te envié solicitud de amistad.',
        timestamp: '09:45',
        isSystemNote: true,
      },
    ],
  },
  {
    id: '2',
    summonerName: 'Zed_Lord',
    rank: 'Platino II',
    role: 'Jungle',
    championEmoji: '⚔️',
    avatarGradient: 'from-red-700 to-zinc-800',
    lastMessage: 'Mo mensaje, jungano da...',
    lastTime: '09:36',
    isOnline: false,
    messages: [
      {
        id: 'm1',
        sender: 'contact',
        content: 'Ey, ¿buscas jungla para rankeds?',
        timestamp: '09:30',
      },
      {
        id: 'm2',
        sender: 'user',
        content: 'Sí, pero prefiero junglas con poke, no asesinos puros.',
        timestamp: '09:33',
      },
      {
        id: 'm3',
        sender: 'contact',
        content: 'Mo mensaje, jungano dame otra oportunidad xD',
        timestamp: '09:36',
      },
    ],
  },
  {
    id: '3',
    summonerName: 'Lux_Support_God',
    rank: 'Diamante IV',
    role: 'Support',
    championEmoji: '✨',
    avatarGradient: 'from-sky-400 to-indigo-500',
    lastMessage: 'Hola que staro., ¡ry mnaigo...',
    lastTime: '10:35',
    isOnline: true,
    messages: [
      {
        id: 'm1',
        sender: 'contact',
        content: '¡Hola! Soy support main Lux, busco ADC serio para rankeds.',
        timestamp: '10:34',
      },
      {
        id: 'm2',
        sender: 'user',
        content: '¡Qué bueno! ¿Jugamos unas ranked esta noche?',
        timestamp: '10:35',
      },
    ],
  },
  {
    id: '4',
    summonerName: 'avatras',
    rank: 'Oro III',
    role: 'Top',
    championEmoji: '🛡️',
    avatarGradient: 'from-orange-600 to-red-900',
    lastMessage: 'Te envié solicitud de amista...',
    lastTime: '10:35',
    isOnline: false,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: '¡Hola! Vi tu perfil, busco un top laner serio para subir.',
        timestamp: '10:34',
      },
      {
        id: 'm2',
        sender: 'contact',
        content: 'Te envié solicitud de amistad. ¡Nos vemos en la grieta!',
        timestamp: '10:35',
      },
    ],
  },
];

export const messageService = {
  getAllChats: (): ChatContact[] => CHATS_DATA,
  getChatById: (id: string): ChatContact | undefined =>
    CHATS_DATA.find((c) => c.id === id),
  searchChats: (query: string): ChatContact[] =>
    CHATS_DATA.filter((c) =>
      c.summonerName.toLowerCase().includes(query.toLowerCase())
    ),
};