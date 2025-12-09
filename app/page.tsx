import { auth } from "@/auth"
import { GameClient } from "@/components/GameClient"
import { LoginButton } from "@/components/LoginButton"

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="flex flex-col items-center gap-8 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md">
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
          
          <div className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              Take care of your adorable cat!
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Feed, play, and watch it grow
            </p>
          </div>
          
          <LoginButton />
        </div>
      </div>
    )
  }

  return <GameClient user={session.user} />
}
