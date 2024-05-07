import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div style={{ marginTop: '-200px' }} className="text-center">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-600">Oops! Page not found</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button onClick={goToHome} className="mt-4 bg-green hover:bg-lime-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out">
          Go Home
        </button>
      </div>
    </div>
  );
}
