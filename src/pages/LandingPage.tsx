import React from 'react';
import ListsContent from '../components/ListsContent';
import Header from '../components/Header';
import AddListButton from '../components/AddListButton';

interface GroceryList {
  id: string;
  name: string;
  purchased: number;
  total: number;
  progress: number;
  isCompleted: boolean;
}

interface LandingPageProps {
  lists: GroceryList[];
  onListClick: (listId: string) => void;
  onAddNewList: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ lists, onListClick, onAddNewList }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header title="My Lists" />

      {/* Lists Content */}
      <ListsContent lists={lists} onListClick={onListClick} />

      {/* Floating Action Button */}
      <AddListButton onClick={onAddNewList} />
    </div>
  );
};

export default LandingPage;


