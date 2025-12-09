'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useGameState } from '@/lib/useGameState'
import { CatCharacter } from './CatCharacter'
import { StatsBar } from './StatsBar'
import { GameActions } from './GameActions'
import { LogOut, RotateCcw, Clock } from 'lucide-react'

interface GameClientProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function GameClient({ user }: GameClientProps) {
  const {
    gameState,
    isLoaded,
    feed,
    play,
    sleep,
    giveMedicine,
    resetGame,
  } = useGameState(user.email || user.id)

  const [currentAction, setCurrentAction] = useState<'eating' | 'playing' | 'sleeping' | null>(null)

  const handleAction = (action: () => void, animationType: 'eating' | 'playing' | 'sleeping') => {
    action()
    setCurrentAction(animationType)
    setTimeout(() => setCurrentAction(null), 2000)
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulse">
          Loading your pet...
        </div>
      </div>
    )
  }

  const getMoodMessage = () => {
    switch (gameState.mood) {
      case 'happy': return `${gameState.name} is feeling great! 🌟`
      case 'sad': return `${gameState.name} is feeling down... 😢`
      case 'tired': return `${gameState.name} needs some rest... 😴`
      case 'hungry': return `${gameState.name} is hungry! 🍖`
      case 'sick': return `${gameState.name} is not feeling well! 🤒`
      default: return `${gameState.name} is doing okay.`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {user.image && (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="w-12 h-12 rounded-full border-2 border-purple-500"
              />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {user.name || 'Player'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm('Reset your pet? This will start over!')) {
                  resetGame()
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Pet Name and Info */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {gameState.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Age: {gameState.age} hours</span>
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {getMoodMessage()}
            </p>
          </div>

          {/* Cat Character */}
          <div className="flex justify-center py-8">
            <CatCharacter
              mood={gameState.mood}
              isAnimating={false}
              action={currentAction}
            />
          </div>

          {/* Stats */}
          <div className="space-y-4 max-w-md mx-auto">
            <StatsBar
              label="Health"
              value={gameState.health}
              max={100}
              color="red"
              icon="health"
            />
            <StatsBar
              label="Hunger"
              value={gameState.hunger}
              max={100}
              color="green"
              icon="hunger"
            />
            <StatsBar
              label="Happiness"
              value={gameState.happiness}
              max={100}
              color="yellow"
              icon="happiness"
            />
            <StatsBar
              label="Energy"
              value={gameState.energy}
              max={100}
              color="blue"
              icon="energy"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-4">
            <GameActions
              onFeed={() => handleAction(feed, 'eating')}
              onPlay={() => handleAction(play, 'playing')}
              onSleep={() => handleAction(sleep, 'sleeping')}
              onMedicine={() => handleAction(giveMedicine, 'eating')}
              canPlay={gameState.energy >= 15}
              health={gameState.health}
            />
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-2xl">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">💡 Tips:</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Feed your cat regularly to keep hunger levels high</li>
              <li>• Play to increase happiness, but watch the energy!</li>
              <li>• Let your cat sleep to restore energy</li>
              <li>• Use medicine when health is low</li>
              <li>• Stats decrease over time, so check in often!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
