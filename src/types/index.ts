export type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  isPurchased: boolean;
};

export type GroceryList = {
  id: string;
  name: string;
  purchased: number;
  total: number;
  progress: number;
  isCompleted: boolean;
  items: ShoppingItem[];
};

export type MasterItem = {
  id: string;
  name: string;
  category: string;
};

export type SelectedItem = MasterItem & {
  quantity: number;
  isSelected: boolean;
};

export type Screen = 'my-lists' | 'add-items' | 'shopping-view';
