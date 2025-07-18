// Funções utilitárias para autenticação
export const getToken = () => {
  return localStorage.getItem('access_token');
};

export const setToken = (token) => {
  localStorage.setItem('access_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isEmployer = () => {
  const user = getUser();
  return user && user.user_type === 'employer';
};

export const isCandidate = () => {
  const user = getUser();
  return user && user.user_type === 'candidate';
};

