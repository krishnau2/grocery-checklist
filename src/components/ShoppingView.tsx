import React, { useState } from 'react';

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
      <header className="bg-white p-4 border-b border-gray-200 flex items-center">
        <button
          onClick={onBack}
          className="text-gray-600 p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-2">{listName}</h1>
      </header>

      {/* Shopping List Content */}
      <main className="flex-grow p-4 overflow-y-auto bg-white">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex items-center py-4">
              <input
                id={item.id}
                type="checkbox"
                checked={item.isPurchased}
                onChange={() => onItemToggle(item.id)}
                className="h-6 w-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor={item.id} className="ml-3 flex-grow cursor-pointer">
                <span 
                  className={`text-lg ${
                    item.isPurchased 
                      ? 'text-gray-500 line-through decoration-2' 
                      : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </span>
                <span 
                  className={`block text-sm ${
                    item.isPurchased 
                      ? 'text-gray-400 line-through' 
                      : 'text-gray-500'
                  }`}
                >
                  {item.quantity}
                </span>
              </label>
            </div>
          ))}
        </div>
      </main>

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