export type Rank =
  | 'Hierro' | 'Bronce' | 'Plata' | 'Oro' | 'Platino'
  | 'Esmeralda' | 'Diamante' | 'Maestro' | 'Gran Maestro' | 'Retador';

export type Division = 'I' | 'II' | 'III' | 'IV';

export type PlayStyle = 'Agresivo' | 'Pasivo' | 'Roamer' | 'Farmero' | 'Tryhard' | 'Support';

export type MasteryLevel = 'M4' | 'M5' | 'M6' | 'M7';

export type MainRole = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support' | 'Fill';

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

export interface DiscoverProfile {
  id: string;
  summonerName: string;
  tagLine: string;
  avatarUrl: string;
  splashUrl: string;
  splashFocus: string;   // CSS object-position e.g. "center", "right top", "70% 20%"
  rank: UserRank;
  winRate: number;
  gamesAnalyzed: number;
  playStyles: PlayStyle[];
  topChampions: ChampionMastery[];
  mainRole: MainRole;
  wins: number;
  losses: number;
  region: string;
  lookingForDuo: boolean;
  createdAt: string;
  updatedAt: string;
}