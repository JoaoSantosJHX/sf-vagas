import { Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Há 1 dia';
    if (diffDays < 7) return `Há ${diffDays} dias`;
    if (diffDays < 30) return `Há ${Math.ceil(diffDays / 7)} semanas`;
    return `Há ${Math.ceil(diffDays / 30)} meses`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link 
            to={`/jobs/${job.id}`}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            {job.title}
          </Link>
          <div className="flex items-center space-x-1 text-gray-600 mt-1">
            <Building size={16} />
            <span className="text-sm">{job.company_name}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock size={14} />
            <span>{formatDate(job.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-1 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.contract_type}
          </span>
          
          {job.salary_range && (
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign size={16} />
              <span className="text-sm">{job.salary_range}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description.length > 150 
          ? `${job.description.substring(0, 150)}...` 
          : job.description
        }
      </p>

      <div className="flex justify-between items-center">
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

