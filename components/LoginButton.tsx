'use client'

import { signIn } from 'next-auth/react'
import { LogIn } from 'lucide-react'

export function LoginButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <LogIn className="w-5 h-5" />
      Sign in with Google
    </button>
  )
}
