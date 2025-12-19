export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GameState {
  score: number;
  orbsCollected: number;
  totalOrbs: number;
  dayTime: number;
  dayCount: number;
}
