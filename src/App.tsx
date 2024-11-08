import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/autentificacion';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Aquí puedes añadir más rutas a medida que amplíes la app */}
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-800">Bienvenido a la App</h1>
    <p className="mt-2 text-gray-600">Navega a la página de registro para comenzar.</p>
  </div>
);

export default App;
