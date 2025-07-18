import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-xl">
                SF
              </div>
              <span className="text-xl font-bold text-gray-900">Vagas</span>
            </div>
            <p className="text-gray-600 text-sm">
              Conectando talentos e oportunidades em Simões Filho. 
              Encontre sua próxima oportunidade profissional ou o candidato ideal para sua empresa.
            </p>
          </div>

          {/* Links para candidatos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Para Candidatos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Buscar Vagas
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-gray-900">
                  Criar Conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Links para empregadores */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Para Empregadores</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-gray-600 hover:text-gray-900">
                  Publicar Vaga
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-gray-900">
                  Criar Conta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 SF Vagas. Todos os direitos reservados. Desenvolvido para Simões Filho.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

