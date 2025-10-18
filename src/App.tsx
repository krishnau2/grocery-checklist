import { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import AddItems from './components/AddItems';
import ShoppingView from './components/ShoppingView';
import { Routes, Route } from 'react-router-dom';

type Screen = 'my-lists' | 'add-items' | 'shopping-view';

interface GroceryList {
  id: string;
  name: string;
  purchased: number;
  total: number;
  progress: number;
  isCompleted: boolean;
  items: ShoppingItem[];
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  isPurchased: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('my-lists');
  const [currentListId, setCurrentListId] = useState<string>('');
  const [listName, setListName] = useState('New List Name');
  
  const [lists, setLists] = useState<GroceryList[]>([
    {
      id: '1',
      name: 'Weekly Groceries',
      purchased: 3,
      total: 8,
      progress: 37.5,
      isCompleted: false,
      items: [
        { id: '1', name: 'Lettuce', quantity: '1 bag', isPurchased: false },
        { id: '2', name: 'Onions', quantity: '2 lbs', isPurchased: false },
        { id: '3', name: 'Chicken Breast', quantity: '1 pack', isPurchased: false },
        { id: '4', name: 'Milk', quantity: '1 Gallon', isPurchased: true },
        { id: '5', name: 'Bread', quantity: '2 Loaves', isPurchased: true },
      ]
    },
    {
      id: '2',
      name: 'BBQ Party',
      purchased: 0,
      total: 12,
      progress: 0,
      isCompleted: false,
      items: []
    },
    {
      id: '3',
      name: 'Weekend Camping Trip',
      purchased: 5,
      total: 5,
      progress: 100,
      isCompleted: true,
      items: []
    }
  ]);

  const handleListClick = (listId: string) => {
    setCurrentListId(listId);
    setCurrentScreen('shopping-view');
  };

  const handleAddNewList = () => {
    setListName('New List Name');
    setCurrentScreen('add-items');
  };

  const handleBackToLists = () => {
    setCurrentScreen('my-lists');
  };

  const handleAddMoreItems = () => {
    setCurrentScreen('add-items');
  };

  const handleItemToggle = (itemId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === currentListId
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId
                  ? { ...item, isPurchased: !item.isPurchased }
                  : item
              ),
              purchased: list.items.filter(item => 
                item.id === itemId ? !item.isPurchased : item.isPurchased
              ).length,
              progress: list.items.length > 0 
                ? ((list.items.filter(item => 
                    item.id === itemId ? !item.isPurchased : item.isPurchased
                  ).length / list.items.length) * 100)
                : 0,
              isCompleted: list.items.length > 0 && 
                list.items.filter(item => 
                  item.id === itemId ? !item.isPurchased : item.isPurchased
                ).length === list.items.length
            }
          : list
      )
    );
  };

  const handleDoneAddingItems = (selectedItems: any[]) => {
    const newItems: ShoppingItem[] = selectedItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: `${item.quantity} ${item.quantity === 1 ? 'item' : 'items'}`,
      isPurchased: false
    }));

    if (currentListId) {
      // Update existing list
      setLists(prevLists =>
        prevLists.map(list =>
          list.id === currentListId
            ? {
                ...list,
                items: [...list.items, ...newItems],
                total: list.items.length + newItems.length,
                progress: 0
              }
            : list
        )
      );
    } else {
      // Create new list
      const newList: GroceryList = {
        id: Date.now().toString(),
        name: listName,
        purchased: 0,
        total: newItems.length,
        progress: 0,
        isCompleted: false,
        items: newItems
      };
      setLists(prevLists => [...prevLists, newList]);
      setCurrentListId(newList.id);
    }
    
    setCurrentScreen('shopping-view');
  };

  const currentList = lists.find(list => list.id === currentListId);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      {/* Mobile Container */}
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        <div className={`screen flex flex-col h-full ${currentScreen === 'my-lists' ? '' : 'hidden'}`}>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  lists={lists}
                  onListClick={handleListClick}
                  onAddNewList={handleAddNewList}
                />
              }
            />
          </Routes>
        </div>

        <div className={`screen flex flex-col h-full ${currentScreen === 'add-items' ? '' : 'hidden'}`}>
          <AddItems
            onBack={handleBackToLists}
            onDone={handleDoneAddingItems}
            listName={listName}
            onListNameChange={setListName}
          />
        </div>

        <div className={`screen flex flex-col h-full ${currentScreen === 'shopping-view' ? '' : 'hidden'}`}>
          {currentList && (
            <ShoppingView
              onBack={handleBackToLists}
              onAddMoreItems={handleAddMoreItems}
              listName={currentList.name}
              items={currentList.items}
              onItemToggle={handleItemToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
