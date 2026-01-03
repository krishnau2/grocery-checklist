type AddListButtonProps = {
  onClick: () => void;
};

const AddListButton: React.FC<AddListButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute bottom-10 right-10">
      <button
        onClick={onClick}
        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform duration-200 ease-in-out transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default AddListButton;
