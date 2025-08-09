import React, { useState } from 'react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  isSelected: boolean;
}

interface AddItemsProps {
  onBack: () => void;
  onDone: (selectedItems: GroceryItem[]) => void;
  listName: string;
  onListNameChange: (name: string) => void;
}

const AddItems: React.FC<AddItemsProps> = ({ 
  onBack, 
  onDone, 
  listName, 
  onListNameChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<GroceryItem[]>([
    { id: '1', name: 'Apples', category: 'Produce', quantity: 0, isSelected: false },
    { id: '2', name: 'Bananas', category: 'Produce', quantity: 0, isSelected: false },
    { id: '3', name: 'Lettuce', category: 'Produce', quantity: 1, isSelected: true },
    { id: '4', name: 'Milk', category: 'Dairy & Eggs', quantity: 0, isSelected: false },
    { id: '5', name: 'Eggs', category: 'Dairy & Eggs', quantity: 0, isSelected: false },
  ]);

  const handleQuantityChange = (itemId: string, change: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + change),
              isSelected: item.quantity + change > 0
            }
          : item
      )
    );
  };

  const handleDone = () => {
    const selectedItems = items.filter(item => item.isSelected);
    onDone(selectedItems);
  };

  const selectedCount = items.filter(item => item.isSelected).length;

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

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
        <input
          type="text"
          value={listName}
          onChange={(e) => onListNameChange(e.target.value)}
          className="text-2xl font-bold text-gray-800 bg-transparent focus:outline-none focus:ring-0 border-none ml-2 w-full"
        />
      </header>

      {/* Items Content */}
      <main className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search master list..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h3 className="font-bold text-lg text-gray-700 mb-2">{category}</h3>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between bg-white p-3 rounded-lg border ${
                      item.isSelected ? 'border-blue-500 ring-2 ring-blue-200' : ''
                    }`}
                  >
                    <span className="text-gray-800">{item.name}</span>
                    {item.isSelected ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="text-gray-500 font-bold p-2 rounded-full hover:bg-gray-100 text-xl"
                        >
                          -
                        </button>
                        <span className="font-semibold">
                          {item.quantity} {item.quantity === 1 ? 'item' : 'items'}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="text-blue-500 font-bold p-2 rounded-full hover:bg-blue-50 text-xl"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="text-blue-500 font-bold p-2 rounded-full hover:bg-blue-50 text-xl"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-4 bg-white border-t">
        <button
          onClick={handleDone}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Done ({selectedCount} item{selectedCount !== 1 ? 's' : ''})
        </button>
      </footer>
    </div>
  );
};

export default AddItems; 