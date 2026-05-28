import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trophy, Users, Gamepad2, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8" />
              <span className="text-2xl font-bold">GameHok</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/tournaments" className="flex items-center space-x-1 hover:text-accent transition">
              <Trophy className="h-5 w-5" />
              <span>Tournaments</span>
            </Link>
            <Link to="/teams" className="flex items-center space-x-1 hover:text-accent transition">
              <Users className="h-5 w-5" />
              <span>Teams</span>
            </Link>
            <Link to="/matches" className="flex items-center space-x-1 hover:text-accent transition">
              <Gamepad2 className="h-5 w-5" />
              <span>Matches</span>
            </Link>
            
            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 hover:text-accent transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-accent transition">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
