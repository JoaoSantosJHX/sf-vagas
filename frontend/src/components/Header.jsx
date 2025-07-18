import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { isAuthenticated, getUser, removeToken, isEmployer } from '@/lib/auth';
import { LogOut, User, Briefcase, Home } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-xl">
                SF
              </div>
              <span className="text-xl font-bold text-gray-900">Vagas</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
            >
              <Home size={16} />
              <span>Início</span>
            </Link>
            
            {authenticated && isEmployer() && (
              <>
                <Link
                  to="/post-job"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                >
                  <Briefcase size={16} />
                  <span>Publicar Vaga</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

