import type { GroceryList, ShoppingItem } from '../types';

/**
 * Calculate list statistics based on items
 */
export const calculateListStats = (items: ShoppingItem[]) => {
  const total = items.length;
  const purchased = items.filter(item => item.isPurchased).length;
  const progress = total > 0 ? (purchased / total) * 100 : 0;
  const isCompleted = total > 0 && purchased === total;

  return { total, purchased, progress, isCompleted };
};

/**
 * Update a list's statistics after item changes
 */
export const updateListWithStats = (list: GroceryList): GroceryList => {
  const stats = calculateListStats(list.items);
  return {
    ...list,
    ...stats
  };
};

/**
 * Toggle an item's purchased status in a list
 */
export const toggleItemInList = (
  list: GroceryList,
  itemId: string
): GroceryList => {
  const updatedItems = list.items.map(item =>
    item.id === itemId
      ? { ...item, isPurchased: !item.isPurchased }
      : item
  );

  const stats = calculateListStats(updatedItems);

  return {
    ...list,
    items: updatedItems,
    ...stats
  };
};

/**
 * Add items to a list and recalculate stats
 */
export const addItemsToList = (
  list: GroceryList,
  newItems: ShoppingItem[]
): GroceryList => {
  const updatedItems = [...list.items, ...newItems];
  const stats = calculateListStats(updatedItems);

  return {
    ...list,
    items: updatedItems,
    ...stats
  };
};

/**
 * Generate a unique ID (simple timestamp-based)
 */
export const generateId = (): string => {
  return Date.now().toString();
};
