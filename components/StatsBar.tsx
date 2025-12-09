'use client'

import { Heart, Smile, Zap, Apple } from 'lucide-react'

interface StatsBarProps {
  label: string
  value: number
  max: number
  color: string
  icon: 'health' | 'happiness' | 'energy' | 'hunger'
}

export function StatsBar({ label, value, max, color, icon }: StatsBarProps) {
  const percentage = (value / max) * 100
  
  const getIcon = () => {
    switch (icon) {
      case 'health': return <Heart className="w-5 h-5" />
      case 'happiness': return <Smile className="w-5 h-5" />
      case 'energy': return <Zap className="w-5 h-5" />
      case 'hunger': return <Apple className="w-5 h-5" />
    }
  }

  const getColorClass = () => {
    switch (color) {
      case 'red': return 'bg-red-500'
      case 'yellow': return 'bg-yellow-500'
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={color === 'red' ? 'text-red-500' : color === 'yellow' ? 'text-yellow-500' : color === 'blue' ? 'text-blue-500' : 'text-green-500'}>
            {getIcon()}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{Math.round(value)}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getColorClass()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
