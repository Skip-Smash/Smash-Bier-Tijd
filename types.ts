export interface BeerTimeConfig {
  hour: number;
  minute: number;
  timestamp: number; // Unix timestamp for today's beer time
  endTimestamp: number; // Unix timestamp for when the day ends (go home)
}

export enum AppState {
  LOADING = 'LOADING',
  WAITING = 'WAITING',
  BEER_TIME = 'BEER_TIME',
  GO_HOME = 'GO_HOME',
}

export interface QuoteResponse {
  text: string;
}