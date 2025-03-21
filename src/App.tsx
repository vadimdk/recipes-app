import { Outlet, Link, useLocation } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={clsx(
                  'flex items-center space-x-2 font-medium',
                  location.pathname === '/'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                )}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/favorites"
                className={clsx(
                  'flex items-center space-x-2 font-medium',
                  location.pathname === '/favorites'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                )}
              >
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;