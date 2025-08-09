# Grocery List App

A modern, mobile-first grocery list application built with React, TypeScript, and Tailwind CSS.

## Features

- **My Lists Screen**: View all your grocery lists with progress indicators
- **Add Items Screen**: Add items to your lists with categorized items and quantity controls
- **Shopping View**: Mark items as purchased with checkboxes and strikethrough styling
- **Responsive Design**: Mobile-first design that works great on all devices
- **Smooth Transitions**: Elegant screen transitions and hover effects

## Screens

### 1. My Lists
- Displays all grocery lists with progress bars
- Shows completion status and item counts
- Floating action button to create new lists
- Click on any list to view/edit it

### 2. Add Items
- Searchable master list of grocery items
- Items organized by categories (Produce, Dairy & Eggs, etc.)
- Quantity controls with +/- buttons
- Real-time item count in the "Done" button

### 3. Shopping View
- Checkbox interface for marking items as purchased
- Strikethrough styling for completed items
- Add more items functionality
- Progress tracking

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Inter Font** for modern typography

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── MyLists.tsx      # Main lists view
│   ├── AddItems.tsx     # Add items to lists
│   └── ShoppingView.tsx # Shopping list view
├── App.tsx              # Main app with state management
├── index.css            # Global styles and Tailwind imports
└── main.tsx            # App entry point
```

## State Management

The app uses React's `useState` hook for state management:

- **Current Screen**: Tracks which screen is currently displayed
- **Lists**: Array of grocery lists with items and progress
- **Current List**: Currently selected list for editing
- **List Name**: Name of the list being created/edited

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Mobile-First**: Responsive design optimized for mobile devices
- **Inter Font**: Modern, readable typography
- **Smooth Transitions**: CSS transitions for screen changes

## Development

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Vite**: Fast development server with HMR

## Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

MIT License
