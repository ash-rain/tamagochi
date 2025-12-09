export interface GameState {
  name: string
  hunger: number // 0-100
  happiness: number // 0-100
  energy: number // 0-100
  health: number // 0-100
  age: number // in hours
  mood: 'happy' | 'sad' | 'tired' | 'hungry' | 'sick' | 'neutral'
  lastFed: number
  lastPlayed: number
  lastSlept: number
  createdAt: number
}

export const INITIAL_STATE: GameState = {
  name: 'Kitty',
  hunger: 50,
  happiness: 50,
  energy: 50,
  health: 100,
  age: 0,
  mood: 'neutral',
  lastFed: Date.now(),
  lastPlayed: Date.now(),
  lastSlept: Date.now(),
  createdAt: Date.now(),
}

export const STAT_DECAY_RATE = {
  hunger: 2, // points per minute
  happiness: 1.5,
  energy: 1,
}

export const ACTION_EFFECTS = {
  feed: { hunger: 30, health: 5 },
  play: { happiness: 25, energy: -15 },
  sleep: { energy: 40, happiness: 10 },
  medicine: { health: 30 },
}
