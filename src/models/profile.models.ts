export type Rank =
  | 'Hierro' | 'Bronce' | 'Plata' | 'Oro' | 'Platino'
  | 'Esmeralda' | 'Diamante' | 'Maestro' | 'Gran Maestro' | 'Retador';

export type Division = 'I' | 'II' | 'III' | 'IV';

export type PlayStyle = 'Agresivo' | 'Pasivo' | 'Roamer' | 'Farmero' | 'Tryhard' | 'Support';

export type MasteryLevel = 'M4' | 'M5' | 'M6' | 'M7';

export interface ChampionMastery {
  id: string;
  name: string;
  iconUrl: string;
  mastery: MasteryLevel;
}

export interface UserRank {
  tier: Rank;
  division: Division;
  lp: number;
}

export interface UserProfile {
  id: string;
  summonerName: string;
  tagLine: string;
  avatarUrl: string;
  rank: UserRank;
  winRate: number;
  gamesAnalyzed: number;
  playStyles: PlayStyle[];
  topChampions: ChampionMastery[];
  wins: number;
  losses: number;
  region: string;
  createdAt: string;
  updatedAt: string;
}