import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ItemList from '../components/ItemList';
import type { GroceryList } from '../types';

type GroceryListItemPageProps = {
  lists: GroceryList[];
  onItemToggle: (listId: string, itemId: string) => void;
};

const GroceryListItemPage: React.FC<GroceryListItemPageProps> = ({ lists, onItemToggle }) => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();

  const currentList = lists.find(list => list.id === listId);

  if (!currentList) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="text-gray-500">List not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Go back to lists
        </button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleAddMoreItems = () => {
    navigate(`/list/${listId}/add-items`);
  };

  const handleItemToggle = (itemId: string) => {
    onItemToggle(listId!, itemId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header
        title={currentList.name}
        button={{
          onClick: handleBack,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          )
        }}
      />

      {/* Shopping List Content */}
      <ItemList items={currentList.items} onItemToggle={handleItemToggle} />

      <footer className="p-4 bg-white border-t">
        <button
          onClick={handleAddMoreItems}
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

export default GroceryListItemPage;
