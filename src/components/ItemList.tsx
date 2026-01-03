import type { ShoppingItem } from '../types';

type ItemListProps = {
  items: ShoppingItem[];
  onItemToggle: (itemId: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onItemToggle }) => {
  return (
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
  );
};

export default ItemList;
