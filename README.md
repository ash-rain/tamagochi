# 🐱 Tamagotchi Cat Game

A cute virtual pet Tamagotchi-style game featuring an adorable cat character! Built with Next.js 15, React 19, and TypeScript.

## ✨ Features

- 🎮 **Interactive Gameplay**: Feed, play with, and take care of your virtual cat
- 😺 **Cute Cat Character**: Animated cat with different moods and expressions
- 📊 **Real-time Stats**: Track hunger, happiness, energy, and health
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 🐾 **Pet Naming**: Choose a unique name for your virtual pet
- 💾 **Persistent Storage**: Your pet's data is saved locally in your browser
- ⏰ **Time-based Mechanics**: Stats decrease over time, requiring regular care
- 🌓 **Dark Mode Support**: Looks great in light and dark themes

## 🎯 How to Play

1. **Name your pet** when you first start the game
2. **Take care** of your cat by:
   - 🍖 **Feed**: Increases hunger and health
   - 🎾 **Play**: Boosts happiness (costs energy)
   - 😴 **Sleep**: Restores energy and happiness
   - 💊 **Medicine**: Heals your cat when sick

3. **Watch your stats**: Keep all bars high to maintain a happy, healthy cat!
4. **Check regularly**: Stats decrease over time, so visit often!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Enter a name for your virtual pet and start playing!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage

## 📁 Project Structure

```
tamagochi/
├── app/
│   ├── globals.css              # Global styles & animations
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main game page
├── components/
│   ├── CatCharacter.tsx         # Animated cat character
│   ├── GameActions.tsx          # Action buttons
│   ├── GameClient.tsx           # Main game client component
│   ├── PetNameSelector.tsx      # Pet name selection screen
│   └── StatsBar.tsx             # Stats display bars
└── lib/
    ├── types.ts                 # TypeScript types & constants
    └── useGameState.ts          # Game state management hook
```

## 🎮 Game Mechanics

### Stats Decay Rates (per minute)
- **Hunger**: -2 points
- **Happiness**: -1.5 points
- **Energy**: -1 point

### Action Effects
- **Feed**: +30 hunger, +5 health
- **Play**: +25 happiness, -15 energy (requires 15+ energy)
- **Sleep**: +40 energy, +10 happiness
- **Medicine**: +30 health (only when health < 90)

### Mood System
Your cat's mood changes based on stats:
- 😺 **Happy**: High hunger, happiness, and energy
- 😿 **Sad**: Low happiness
- 😴 **Tired**: Low energy
- 🍖 **Hungry**: Low hunger
- 🤒 **Sick**: Low health
- 😐 **Neutral**: Everything is okay

## 🎨 Customization

You can customize the game by editing:
- **Cat appearance**: `components/CatCharacter.tsx`
- **Game constants**: `lib/types.ts`
- **UI colors**: Tailwind classes in components
- **Animation speeds**: `app/globals.css`

## 📝 License

MIT License - feel free to use this project for learning or personal use!

---

Made with ❤️ and ☕
