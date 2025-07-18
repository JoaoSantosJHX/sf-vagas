import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onSearch, initialTitle = '', initialLocation = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ title: title.trim(), location: location.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Campo de título/palavras-chave */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cargo, palavras-chave ou empresa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Campo de localização */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cidade, bairro ou região"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botão de busca */}
        <Button 
          type="submit" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Buscar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

