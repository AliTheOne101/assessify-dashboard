import { useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Assessment Portal</h1>
        <div className="flex gap-4">
          <button onClick={handleHome} className="nav-link flex items-center gap-2">
            <Home className="w-5 h-5" />
            Home
          </button>
          <button onClick={handleLogout} className="nav-link flex items-center gap-2 text-red-600 hover:text-red-700">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};