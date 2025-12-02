export enum GamePhase {
  START = 'START',
  PLAYING = 'PLAYING',
  MERCY_CHECK = 'MERCY_CHECK', // The "Last Chance" dialog
  EXPLOSION = 'EXPLOSION',
}

export interface CordState {
  id: number;
  isBroken: boolean;
  word?: string; // The word displayed when broken
  positionY: number; // Vertical position % on the bag neck
}
