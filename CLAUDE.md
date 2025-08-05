# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm start` - Runs the app at http://localhost:3000
- **Build for production**: `pnpm build` - Creates optimized production build
- **Run tests**: `pnpm test` - Launches Jest test runner in watch mode
- **Lint code**: `pnpm run lint` - Check code with Biome linter
- **Fix lint issues**: `pnpm run lint:fix` - Auto-fix linting issues with Biome
- **Format code**: `pnpm run format` - Format code with Biome

## Project Architecture

This is a React application that creates an animated diamond ring visualization using HTML5 Canvas and the Web Audio API.

### Core Components

- **BiasedDiamondRing** (`src/components/BiasedDiamondRing/index.tsx`): Main visualization component that draws an animated tilted elliptical ring on canvas. Generates random points on an ellipse, connects them progressively with lines, and cycles through different configurations.

- **App.tsx**: Root component that renders the main visualization along with navigation components (ReturnToHome, GitHub).

### Custom Hooks

- **useWindowSize** (`src/hooks/useWindowSize/index.ts`): Tracks window dimensions for responsive canvas sizing.
- **useSound** (`src/hooks/useSound/index.ts`): Manages audio feedback using Tone.js. Plays random notes from a D#6add9 scale when drawing lines (disabled on mobile).

### Key Technical Details

- Uses React 18 with TypeScript and Create React App
- Canvas rendering with requestAnimationFrame for smooth animation
- Responsive design with mobile detection via react-device-detect
- Audio synthesis using Tone.js with square wave oscillators
- SCSS for styling with CSS modules for components
- Biome for linting and formatting (replacing ESLint/Prettier)

### Animation Logic

The BiasedDiamondRing component:
1. Generates 20-120 random points on a tilted ellipse
2. Sorts points by angle for consistent drawing order  
3. Progressively draws lines from each point to all subsequent points
4. Plays audio beep for each line drawn (desktop only)
5. Waits 300 frames then regenerates with new configuration

### Development Notes

- Canvas size is fixed at 4000x3000 for high-resolution rendering
- Mobile devices get reduced point counts (max 100 vs 120) for performance
- Audio is muted on mobile to avoid unwanted sounds
- Uses strict TypeScript configuration with modern React patterns