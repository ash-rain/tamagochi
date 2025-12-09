'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PetNameSelectorProps {
  onNameSubmit: (name: string) => void
}

export function PetNameSelector({ onNameSubmit }: PetNameSelectorProps) {
  const [petName, setPetName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (petName.trim().length > 0) {
      onNameSubmit(petName.trim())
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="flex flex-col items-center gap-8 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
            Tamagotchi Cat
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your virtual pet companion
          </p>
        </div>

        <div className="text-8xl animate-bounce">
          🐱
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-3">
            <label 
              htmlFor="petName" 
              className="block text-center text-lg font-semibold text-gray-700 dark:text-gray-200"
            >
              What's your cat's name?
            </label>
            <input
              id="petName"
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter a name..."
              maxLength={20}
              className="w-full px-6 py-4 text-center text-xl font-medium bg-gray-50 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-500 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              autoFocus
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Choose a special name for your pet
            </p>
          </div>

          <button
            type="submit"
            disabled={petName.trim().length === 0}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Create My Pet
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            Take care of your adorable cat!
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Feed, play, and watch it grow
          </p>
        </div>
      </div>
    </div>
  )
}
