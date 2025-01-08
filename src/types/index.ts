export interface CodeUpdate {
  id: string;
  game: string;
  gameSlug: string;
  code: string;
  reward: string;
  expiryDate?: string;
  addedDate: string;
  status: 'active' | 'expired';
}

export interface GameUpdate {
  id: string;
  game: string;
  gameSlug: string;
  title: string;
  description: string;
  date: string;
  type: 'codes' | 'event' | 'update';
} 