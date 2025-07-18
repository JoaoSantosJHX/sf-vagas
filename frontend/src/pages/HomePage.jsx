import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { jobsAPI } from '@/lib/api';
import { Loader2, Briefcase } from 'lucide-react';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchFilters, setSearchFilters] = useState({
    title: searchParams.get('title') || '',
    location: searchParams.get('location') || ''
  });

  const fetchJobs = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = {
        page,
        per_page: 10,
        ...filters
      };
      
      const response = await jobsAPI.getJobs(params);
      setJobs(response.data.jobs);
      setTotalPages(response.data.pages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar vagas. Tente novamente.');
      console.error('Erro ao buscar vagas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1, searchFilters);
  }, []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    
    // Atualizar URL com parâmetros de busca
    const params = new URLSearchParams();
    if (filters.title) params.set('title', filters.title);
    if (filters.location) params.set('location', filters.location);
    setSearchParams(params);
    
    fetchJobs(1, filters);
  };

  const handlePageChange = (page) => {
    fetchJobs(page, searchFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sua próxima oportunidade começa aqui
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Encontre as melhores vagas de emprego em Simões Filho
            </p>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            initialTitle={searchFilters.title}
            initialLocation={searchFilters.location}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header dos resultados */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {searchFilters.title || searchFilters.location 
                ? 'Resultados da busca' 
                : 'Vagas disponíveis'
              }
            </h2>
          </div>
          
          {!loading && jobs.length > 0 && (
            <p className="text-gray-600">
              {jobs.length} vagas encontradas
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Carregando vagas...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => fetchJobs(1, searchFilters)}>
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Jobs List */}
        {!loading && !error && (
          <>
            {jobs.length > 0 ? (
              <div className="space-y-4 mb-8">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma vaga encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros de busca ou verifique novamente mais tarde.
                </p>
                <Button onClick={() => handleSearch({ title: '', location: '' })}>
                  Ver todas as vagas
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                <span className="text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

