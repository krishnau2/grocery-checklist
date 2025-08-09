interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </header>
  );
};

export default Header;
