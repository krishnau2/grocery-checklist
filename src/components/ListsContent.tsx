interface GroceryList {
  id: string;
  name: string;
  purchased: number;
  total: number;
  progress: number;
  isCompleted: boolean;
}

interface ListsContentProps {
  lists: GroceryList[];
  onListClick: (listId: string) => void;
}

const ListsContent: React.FC<ListsContentProps> = ({ lists, onListClick }) => {
  return (
    <main className="flex-grow p-4 overflow-y-auto">
      <div className="space-y-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer border border-gray-200"
            onClick={() => onListClick(list.id)}
          >
            <h2 className="font-bold text-lg text-gray-900">{list.name}</h2>
            <p className="text-sm text-gray-500">
              {list.isCompleted 
                ? "All items purchased!" 
                : `${list.purchased}/${list.total} items purchased`
              }
            </p>
            <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full">
              <div 
                className={`h-1.5 rounded-full ${
                  list.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${list.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ListsContent;


