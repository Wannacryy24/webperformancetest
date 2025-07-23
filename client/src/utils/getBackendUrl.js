const getBackendUrl = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://webperformancebackend.onrender.com';
};

export default getBackendUrl;