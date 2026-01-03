type HeaderProps = {
  title: string;
  button?: {
    onClick: () => void;
    icon: React.ReactNode;
  };
};

const Header: React.FC<HeaderProps> = ({ title, button }) => {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex items-center">
      {button && (
        <button
          onClick={button.onClick}
          className="text-gray-600 p-2 rounded-full hover:bg-gray-100"
        >
          {button.icon}
        </button>
      )}
      <h1 className={`text-2xl font-bold text-gray-800 ${button ? 'ml-2' : ''}`}>
        {title}
      </h1>
    </header>
  );
};

export default Header;
