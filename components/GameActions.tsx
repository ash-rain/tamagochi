'use client'

import { Activity, Moon, Utensils, Pill } from 'lucide-react'

interface GameActionsProps {
  onFeed: () => void
  onPlay: () => void
  onSleep: () => void
  onMedicine: () => void
  canPlay: boolean
  health: number
}

export function GameActions({ onFeed, onPlay, onSleep, onMedicine, canPlay, health }: GameActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <button
        onClick={onFeed}
        className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <Utensils className="w-8 h-8" />
        <span className="font-bold text-lg">Feed</span>
      </button>

      <button
        onClick={onPlay}
        disabled={!canPlay}
        className={`flex flex-col items-center gap-2 p-6 ${canPlay
            ? 'bg-gradient-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          } text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:shadow-lg`}
      >
        <Activity className="w-8 h-8" />
        <span className="font-bold text-lg">Play</span>
      </button>

      <button
        onClick={onSleep}
        className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <Moon className="w-8 h-8" />
        <span className="font-bold text-lg">Sleep</span>
      </button>

      <button
        onClick={onMedicine}
        disabled={health >= 90}
        className={`flex flex-col items-center gap-2 p-6 ${health < 90
            ? 'bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          } text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:shadow-lg`}
      >
        <Pill className="w-8 h-8" />
        <span className="font-bold text-lg">Medicine</span>
      </button>
    </div>
  )
}
