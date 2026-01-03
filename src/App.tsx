import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import GroceryListPage from './pages/GroceryListPage';
import GroceryListItemPage from './pages/GroceryListItemPage';
import CreateListPage from './pages/CreateListPage';
import type { GroceryList, ShoppingItem } from './types';
import { toggleItemInList, addItemsToList, generateId, updateListWithStats } from './utils/listHelpers';
import initialListsData from '../data.json';

function App() {
  const [lists, setLists] = useState<GroceryList[]>(initialListsData as GroceryList[]);

  const handleItemToggle = (listId: string, itemId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? toggleItemInList(list, itemId) : list
      )
    );
  };

  const handleCreateList = (listName: string, items: ShoppingItem[]): string => {
    const newList: GroceryList = {
      id: generateId(),
      name: listName,
      purchased: 0,
      total: items.length,
      progress: 0,
      isCompleted: false,
      items: items
    };

    const updatedList = updateListWithStats(newList);
    setLists(prevLists => [...prevLists, updatedList]);
    return updatedList.id;
  };

  const handleAddItemsToList = (listId: string, items: ShoppingItem[]) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? addItemsToList(list, items) : list
      )
    );
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      {/* Mobile Container */}
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        <Routes>
          <Route path="/" element={<GroceryListPage lists={lists} />} />
          <Route
            path="/list/:listId"
            element={<GroceryListItemPage lists={lists} onItemToggle={handleItemToggle} />}
          />
          <Route
            path="/create"
            element={
              <CreateListPage
                onCreateList={handleCreateList}
                onAddItemsToList={handleAddItemsToList}
              />
            }
          />
          <Route
            path="/list/:listId/add-items"
            element={
              <CreateListPage
                onCreateList={handleCreateList}
                onAddItemsToList={handleAddItemsToList}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
