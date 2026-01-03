# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile-first grocery list application built with React 19, TypeScript, and Tailwind CSS. The app uses React Router for navigation with proper routing architecture.

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

- **App.tsx**: Central state container holding all lists
- **Pages**: Receive state via props and communicate changes via callback props
- **State Updates**: All mutations flow back to App.tsx through event handlers using helper functions from `utils/listHelpers.ts`

Key state:
- `lists`: Array of all grocery lists with items, progress tracking (loaded from `data.json`)

### Routing Architecture

The app uses **React Router** for navigation with the following routes:

- `/` - Home page showing all grocery lists (GroceryListPage)
- `/list/:listId` - Individual list shopping view (GroceryListItemPage)
- `/create` - Create new list with item selection (CreateListPage)
- `/list/:listId/add-items` - Add items to existing list (CreateListPage)

Navigation is handled using `useNavigate()` from react-router-dom. Pages use `useParams()` to access route parameters like `listId`.

### Component Structure

**Pages** (`src/pages/`):
- `GroceryListPage.tsx`: Displays all grocery lists with progress tracking
- `GroceryListItemPage.tsx`: Shows individual list items in shopping view mode
- `CreateListPage.tsx`: Dual-purpose page for creating new lists or adding items to existing lists

**Core Components** (`src/components/`):
- `GroceryList.tsx`: Renders the list of all grocery lists with progress bars (exports GroceryListComponent)
- `ShoppingView.tsx`: Legacy component, being phased out in favor of GroceryListItemPage
- `ItemList.tsx`: Reusable item list with checkbox functionality for purchased items
- `Header.tsx`: Reusable header with optional back button
- `AddListButton.tsx`: Floating action button for creating new lists

**Utilities** (`src/utils/`):
- `listHelpers.ts`: Helper functions for list operations and calculations
  - `calculateListStats()`: Calculates total, purchased, progress, and completion status
  - `updateListWithStats()`: Updates a list with recalculated statistics
  - `toggleItemInList()`: Toggles item purchase status and updates stats
  - `addItemsToList()`: Adds items to a list and recalculates stats
  - `generateId()`: Creates unique IDs using timestamps

**Types** (`src/types/`):
- `index.ts`: Central location for all shared TypeScript types (see Data Models section)

### Data Models

All data models are defined in `src/types/index.ts` using TypeScript `type` definitions:

```typescript
type GroceryList = {
  id: string;
  name: string;
  purchased: number;    // Count of purchased items
  total: number;        // Total items in list
  progress: number;     // Percentage (0-100)
  isCompleted: boolean; // True when all items purchased
  items: ShoppingItem[];
};

type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;     // e.g., "2 items", "1 gallon"
  isPurchased: boolean;
};

type MasterItem = {
  id: string;
  name: string;
  category: string;     // e.g., "Produce", "Dairy & Eggs"
};

type SelectedItem = MasterItem & {
  quantity: number;
  isSelected: boolean;
};
```

### Data Sources

The application loads data from JSON files:

- **`data.json`**: Initial grocery lists loaded at startup
  - Add new lists here to have them appear on app load
  - Structure matches the `GroceryList` type

- **`master-items.json`**: Master list of available grocery items
  - Used in CreateListPage for item selection
  - Organized by categories (Produce, Dairy & Eggs, Bakery, Meat, Seafood, etc.)
  - Add new items here to make them available in the app
  - Structure is an array of `MasterItem` objects

### Progress Tracking

Progress is calculated using helper functions in `utils/listHelpers.ts`. When items are toggled or lists are modified, the helper functions automatically recalculate `purchased`, `progress`, and `isCompleted` fields. All calculations are done together to ensure consistency.

Example:
```typescript
// Toggle item and recalculate stats
const updatedList = toggleItemInList(list, itemId);

// Add items and recalculate stats
const updatedList = addItemsToList(list, newItems);
```

## Styling

- **Tailwind CSS**: All styling uses utility classes
- **Mobile-First**: Designed for mobile viewport (~375px width)
- **Container Design**: App renders in a centered, rounded mobile container (max-w-sm, h-[800px])
- **Inter Font**: Loaded via Google Fonts in index.html

When adding new components, maintain the mobile-first approach and use Tailwind's utility classes. The app is optimized for a single mobile viewport size.

## TypeScript Guidelines

### Type vs Interface Rule

**ALWAYS use `type` instead of `interface` for data models and props.**

This project uses TypeScript's `verbatimModuleSyntax` mode, which requires type-only imports for types. Using `type` is preferred because:

1. Clearer distinction between types and runtime values
2. Consistent with `verbatimModuleSyntax` requirements
3. Better for union and intersection types
4. Simpler mental model

**Correct:**
```typescript
type GroceryList = {
  id: string;
  name: string;
  // ...
};

// Import with type keyword
import type { GroceryList } from './types';
```

**Incorrect:**
```typescript
interface GroceryList {
  id: string;
  name: string;
  // ...
}

// This causes verbatimModuleSyntax errors
import { GroceryList } from './types';
```

### Other TypeScript Rules

- Full type safety with strict mode enabled
- All shared types are defined in `src/types/index.ts`
- Component props should use inline `type` definitions
- Always import types with `import type` syntax
- Type checking runs as part of the build process (`npm run build`)

## Known Patterns

1. **Creating Lists**: CreateListPage has dual mode - creating new lists (no `listId` param) vs. adding to existing lists (with `listId` param from URL)
2. **Navigation**: Use `navigate()` from react-router-dom for all navigation, not state-based screen switching
3. **Item Selection**: In CreateListPage, selecting items is managed by quantity > 0, not a separate boolean
4. **ID Generation**: Simple timestamp-based IDs using `generateId()` helper function
5. **State Updates**: Always use helper functions from `utils/listHelpers.ts` to ensure proper statistics calculation
6. **Data Loading**: Initial data loads from `data.json`, master items from `master-items.json`

## Adding New Features

When adding new features:

1. **New data models**: Add to `src/types/index.ts` using `type` definitions
2. **New pages**: Create in `src/pages/` and add routes in `App.tsx`
3. **New components**: Create in `src/components/` and import with proper types
4. **List operations**: Add helper functions to `utils/listHelpers.ts` if they involve list calculations
5. **Master items**: Add to `master-items.json` to make them available in the app
6. **Initial lists**: Add to `data.json` to have them load on startup

Always ensure that list statistics (purchased, total, progress, isCompleted) are recalculated together when modifying lists.
