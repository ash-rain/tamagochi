'use client'

import { useState, useEffect, useCallback } from 'react'
import { GameState, INITIAL_STATE, STAT_DECAY_RATE, ACTION_EFFECTS } from './types'

const STORAGE_KEY = 'tamagotchi-cat-game'
const UPDATE_INTERVAL = 5000 // 5 seconds

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const state = JSON.parse(saved)
      setGameState(state)
    }
    setIsLoaded(true)
  }, [])

  // Save game state to localStorage
  useEffect(() => {
    if (!isLoaded || !gameState) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState, isLoaded])

  // Calculate mood based on stats
  const calculateMood = (state: GameState): GameState['mood'] => {
    if (state.health < 30) return 'sick'
    if (state.hunger < 20) return 'hungry'
    if (state.energy < 20) return 'tired'
    if (state.happiness < 30) return 'sad'
    if (state.happiness > 70 && state.hunger > 60 && state.energy > 60) return 'happy'
    return 'neutral'
  }

  // Update stats based on time passed
  const updateStats = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      const now = Date.now()
      const minutesPassed = Math.max(0, (now - prev.lastFed) / 60000)

      const newHunger = Math.max(0, prev.hunger - minutesPassed * STAT_DECAY_RATE.hunger)
      const newHappiness = Math.max(0, prev.happiness - (now - prev.lastPlayed) / 60000 * STAT_DECAY_RATE.happiness)
      const newEnergy = Math.max(0, prev.energy - (now - prev.lastSlept) / 60000 * STAT_DECAY_RATE.energy)

      // Health decreases if critical stats are low
      let newHealth = prev.health
      if (newHunger < 20 || newEnergy < 20) {
        newHealth = Math.max(0, prev.health - 0.5)
      } else if (newHunger > 60 && newEnergy > 60 && prev.health < 100) {
        newHealth = Math.min(100, prev.health + 0.2)
      }

      const age = (now - prev.createdAt) / (1000 * 60 * 60) // hours

      const newState = {
        ...prev,
        hunger: Math.min(100, newHunger),
        happiness: Math.min(100, newHappiness),
        energy: Math.min(100, newEnergy),
        health: Math.min(100, newHealth),
        age: Math.floor(age),
      }

      return {
        ...newState,
        mood: calculateMood(newState),
      }
    })
  }, [])

  // Update stats periodically
  useEffect(() => {
    if (!isLoaded || !gameState) return

    const interval = setInterval(updateStats, UPDATE_INTERVAL)
    return () => clearInterval(interval)
  }, [isLoaded, gameState, updateStats])

  // Game actions
  const feed = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + ACTION_EFFECTS.feed.hunger),
        health: Math.min(100, prev.health + ACTION_EFFECTS.feed.health),
        lastFed: Date.now(),
      }
    })
  }, [])

  const play = useCallback(() => {
    setGameState(prev => {
      if (!prev || prev.energy < 15) return prev
      return {
        ...prev,
        happiness: Math.min(100, prev.happiness + ACTION_EFFECTS.play.happiness),
        energy: Math.max(0, prev.energy + ACTION_EFFECTS.play.energy),
        lastPlayed: Date.now(),
      }
    })
  }, [])

  const sleep = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      return {
        ...prev,
        energy: Math.min(100, prev.energy + ACTION_EFFECTS.sleep.energy),
        happiness: Math.min(100, prev.happiness + ACTION_EFFECTS.sleep.happiness),
        lastSlept: Date.now(),
      }
    })
  }, [])

  const giveMedicine = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      return {
        ...prev,
        health: Math.min(100, prev.health + ACTION_EFFECTS.medicine.health),
      }
    })
  }, [])

  const createPet = useCallback((name: string) => {
    const newPet = {
      ...INITIAL_STATE,
      name,
      createdAt: Date.now(),
      lastFed: Date.now(),
      lastPlayed: Date.now(),
      lastSlept: Date.now(),
    }
    setGameState(newPet)
  }, [])

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setGameState(null)
  }, [])

  return {
    gameState,
    isLoaded,
    feed,
    play,
    sleep,
    giveMedicine,
    createPet,
    resetGame,
  }
}
