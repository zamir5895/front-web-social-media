import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">Bienvenido a mi App</h1>
        <p className="mt-4 text-lg text-gray-700">
          Esta es una simple página de bienvenida usando Tailwind CSS.
        </p>
        <a
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprende React
        </a>
      </header>
    </div>
  );
}

export default App;