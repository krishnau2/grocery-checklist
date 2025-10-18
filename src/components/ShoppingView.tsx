import React, { useState } from 'react';
import Header from './Header';
import ItemList from './ItemList';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  isPurchased: boolean;
}

interface ShoppingViewProps {
  onBack: () => void;
  onAddMoreItems: () => void;
  listName: string;
  items: ShoppingItem[];
  onItemToggle: (itemId: string) => void;
}

const ShoppingView: React.FC<ShoppingViewProps> = ({
  onBack,
  onAddMoreItems,
  listName,
  items,
  onItemToggle
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title={listName}
        button={{
          onClick: onBack,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          )
        }}
      />

      {/* Shopping List Content */}
      <ItemList items={items} onItemToggle={onItemToggle} />

      <footer className="p-4 bg-white border-t">
        <button
          onClick={onAddMoreItems}
          className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add More Items</span>
        </button>
      </footer>
    </div>
  );
};

export default ShoppingView; 