'use client'

import { GameState } from '@/lib/types'

interface CatCharacterProps {
  mood: GameState['mood']
  isAnimating?: boolean
  action?: 'eating' | 'playing' | 'sleeping' | null
}

export function CatCharacter({ mood, isAnimating, action }: CatCharacterProps) {
  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return 'text-yellow-500'
      case 'sad': return 'text-blue-400'
      case 'tired': return 'text-gray-400'
      case 'hungry': return 'text-orange-500'
      case 'sick': return 'text-green-400'
      default: return 'text-pink-400'
    }
  }

  const getEyes = () => {
    if (action === 'sleeping') return '- -'
    switch (mood) {
      case 'happy': return '^ ^'
      case 'sad': return 'T T'
      case 'tired': return '- -'
      case 'sick': return 'X X'
      default: return '• •'
    }
  }

  const getMouth = () => {
    if (action === 'eating') return '😋'
    switch (mood) {
      case 'happy': return 'ω'
      case 'sad': return '︵'
      case 'tired': return '﹏'
      case 'hungry': return '△'
      case 'sick': return '~'
      default: return 'ω'
    }
  }

  const getAnimation = () => {
    if (action === 'playing') return 'animate-bounce'
    if (action === 'eating') return 'animate-pulse'
    if (isAnimating) return 'animate-wiggle'
    return ''
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className={`text-8xl transition-all duration-300 ${getAnimation()} ${getMoodColor()}`}>
        <div className="relative">
          {/* Cat body */}
          <div className="flex flex-col items-center">
            {/* Ears */}
            <div className="flex gap-8 mb-[-10px]">
              <div className="text-6xl">△</div>
              <div className="text-6xl">△</div>
            </div>
            
            {/* Face */}
            <div className="relative bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 rounded-full w-40 h-40 flex items-center justify-center shadow-2xl border-4 border-pink-300 dark:border-pink-700">
              {/* Eyes */}
              <div className="absolute top-12 left-0 right-0 flex justify-center gap-8 text-3xl font-bold text-gray-800 dark:text-gray-200">
                {getEyes()}
              </div>
              
              {/* Nose */}
              <div className="absolute top-20 text-2xl">
                ▽
              </div>
              
              {/* Mouth */}
              <div className="absolute top-24 text-3xl">
                {getMouth()}
              </div>
              
              {/* Whiskers */}
              <div className="absolute top-20 left-[-20px] text-gray-600 dark:text-gray-300">
                <div className="transform -rotate-12">───</div>
                <div className="transform rotate-12 mt-2">───</div>
              </div>
              <div className="absolute top-20 right-[-20px] text-gray-600 dark:text-gray-300">
                <div className="transform rotate-12">───</div>
                <div className="transform -rotate-12 mt-2">───</div>
              </div>

              {/* Blush */}
              {mood === 'happy' && (
                <>
                  <div className="absolute top-20 left-4 w-6 h-6 bg-pink-300 dark:bg-pink-600 rounded-full opacity-50"></div>
                  <div className="absolute top-20 right-4 w-6 h-6 bg-pink-300 dark:bg-pink-600 rounded-full opacity-50"></div>
                </>
              )}
            </div>

            {/* Body */}
            <div className="mt-2 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 rounded-3xl w-32 h-28 shadow-xl border-4 border-pink-300 dark:border-pink-700 relative">
              {/* Belly spot */}
              <div className="absolute inset-x-8 top-4 bottom-4 bg-white dark:bg-pink-700 rounded-full opacity-40"></div>
            </div>

            {/* Paws */}
            <div className="flex gap-4 mt-[-8px]">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 rounded-full shadow-lg border-2 border-pink-300 dark:border-pink-700"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-900 rounded-full shadow-lg border-2 border-pink-300 dark:border-pink-700"></div>
            </div>

            {/* Tail */}
            <div className="absolute bottom-16 right-[-40px] transform rotate-45">
              <div className="w-16 h-4 bg-gradient-to-r from-pink-200 to-pink-100 dark:from-pink-900 dark:to-pink-800 rounded-full shadow-lg border-2 border-pink-300 dark:border-pink-700"></div>
            </div>
          </div>

          {/* Status indicators */}
          {action && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
              {action === 'eating' && '🍖'}
              {action === 'playing' && '🎾'}
              {action === 'sleeping' && '💤'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
