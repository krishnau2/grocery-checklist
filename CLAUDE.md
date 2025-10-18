# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first grocery list application built with React 19, TypeScript, and Tailwind CSS. The app uses a single-page architecture with screen-based navigation managed via local state rather than React Router routes.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management Architecture

All application state is managed in `App.tsx` using React's `useState` hook. There is **no** external state management library (no Redux, Zustand, etc.). The state flows unidirectionally:

- **App.tsx**: Central state container holding all lists, current screen, and current list ID
- **Screen Components**: Receive state via props and communicate changes via callback props
- **State Updates**: All mutations flow back to App.tsx through event handlers

Key state:
- `lists`: Array of all grocery lists with items, progress tracking
- `currentScreen`: Controls which view is shown ('my-lists' | 'add-items' | 'shopping-view')
- `currentListId`: Tracks which list is being viewed/edited
- `listName`: Name of list being created or edited

### Screen-Based Navigation

The app uses a **custom screen management system**, NOT React Router's routing. While React Router is installed and `BrowserRouter` wraps the app, actual navigation is handled via conditional rendering based on `currentScreen` state:

```tsx
<div className={`screen ${currentScreen === 'my-lists' ? '' : 'hidden'}`}>
  {/* Landing page content */}
</div>
<div className={`screen ${currentScreen === 'add-items' ? '' : 'hidden'}`}>
  {/* Add items content */}
</div>
<div className={`screen ${currentScreen === 'shopping-view' ? '' : 'hidden'}`}>
  {/* Shopping view content */}
</div>
```

When adding new screens, follow this pattern. Navigation between screens is handled by updating `currentScreen` state in App.tsx.

### Component Structure

**Pages** (`src/pages/`):
- `LandingPage.tsx`: Orchestrates the "My Lists" view, composes Header + GroceryList + AddListButton components

**Core Components** (`src/components/`):
- `GroceryList.tsx`: Renders list of all grocery lists with progress bars
- `AddItems.tsx`: Master item list with search, categories, and quantity controls
- `ShoppingView.tsx`: Checklist interface for marking items as purchased
- `ItemList.tsx`: Reusable item list with checkbox functionality
- `Header.tsx`: Reusable header with optional back button
- `AddListButton.tsx`: Floating action button for creating new lists

### Data Models

```typescript
interface GroceryList {
  id: string;
  name: string;
  purchased: number;    // Count of purchased items
  total: number;        // Total items in list
  progress: number;     // Percentage (0-100)
  isCompleted: boolean; // True when all items purchased
  items: ShoppingItem[];
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;     // e.g., "2 items", "1 gallon"
  isPurchased: boolean;
}
```

### Progress Tracking

Progress is calculated inline in `App.tsx` when items are toggled. The calculation updates `purchased`, `progress`, and `isCompleted` fields simultaneously. When modifying list items, ensure these fields are recalculated together in the same state update.

## Styling

- **Tailwind CSS**: All styling uses utility classes
- **Mobile-First**: Designed for mobile viewport (~375px width)
- **Container Design**: App renders in a centered, rounded mobile container (max-w-sm, h-[800px])
- **Inter Font**: Loaded via Google Fonts in index.html

When adding new components, maintain the mobile-first approach and use Tailwind's utility classes. The app is optimized for a single mobile viewport size.

## TypeScript

- Full type safety with strict mode enabled
- Component props are typed with explicit interfaces
- Type checking runs as part of the build process (`npm run build`)

## Known Patterns

1. **Adding Items Flow**: AddItems component has dual mode - creating new lists (no currentListId) vs. adding to existing lists (with currentListId)
2. **Screen Transitions**: Handled via CSS (hidden class) rather than mounting/unmounting components
3. **Item Selection**: In AddItems, selecting items is managed by quantity > 0, not a separate boolean
4. **ID Generation**: Simple timestamp-based IDs (`Date.now().toString()`) for new lists
