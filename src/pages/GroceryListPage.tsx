import React from 'react';
import { useNavigate } from 'react-router-dom';
import GroceryListComponent from '../components/GroceryList';
import Header from '../components/Header';
import AddListButton from '../components/AddListButton';
import type { GroceryList } from '../types';

type GroceryListPageProps = {
  lists: GroceryList[];
};

const GroceryListPage: React.FC<GroceryListPageProps> = ({ lists }) => {
  const navigate = useNavigate();

  const handleListClick = (listId: string) => {
    navigate(`/list/${listId}`);
  };

  const handleAddNewList = () => {
    navigate('/create');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header title="My Lists" />

      {/* Lists Content */}
      <GroceryListComponent lists={lists} onListClick={handleListClick} />

      {/* Floating Action Button */}
      <AddListButton onClick={handleAddNewList} />
    </div>
  );
};

export default GroceryListPage;


