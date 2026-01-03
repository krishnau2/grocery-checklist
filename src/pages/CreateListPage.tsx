import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { MasterItem, SelectedItem, ShoppingItem } from '../types';
import masterItemsData from '../../master-items.json';

type CreateListPageProps = {
  onCreateList: (listName: string, items: ShoppingItem[]) => string;
  onAddItemsToList: (listId: string, items: ShoppingItem[]) => void;
};

const CreateListPage: React.FC<CreateListPageProps> = ({ onCreateList, onAddItemsToList }) => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();

  const [listName, setListName] = useState('New List Name');
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize items from master-items.json
  const [items, setItems] = useState<SelectedItem[]>(
    (masterItemsData as MasterItem[]).map(item => ({
      ...item,
      quantity: 0,
      isSelected: false
    }))
  );

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

    // Convert to ShoppingItem format
    const shoppingItems: ShoppingItem[] = selectedItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: `${item.quantity} ${item.quantity === 1 ? 'item' : 'items'}`,
      isPurchased: false
    }));

    if (listId) {
      // Adding items to existing list
      onAddItemsToList(listId, shoppingItems);
      navigate(`/list/${listId}`);
    } else {
      // Creating new list
      const newListId = onCreateList(listName, shoppingItems);
      navigate(`/list/${newListId}`);
    }
  };

  const handleBack = () => {
    if (listId) {
      navigate(`/list/${listId}`);
    } else {
      navigate('/');
    }
  };

  const selectedCount = items.filter(item => item.isSelected).length;

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SelectedItem[]>);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200 flex items-center">
        <button
          onClick={handleBack}
          className="text-gray-600 p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {!listId && (
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="text-2xl font-bold text-gray-800 bg-transparent focus:outline-none focus:ring-0 border-none ml-2 w-full"
          />
        )}
        {listId && (
          <h1 className="text-2xl font-bold text-gray-800 ml-2">Add Items</h1>
        )}
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

export default CreateListPage;
