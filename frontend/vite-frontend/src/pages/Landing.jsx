import React from 'react';
import NavBar from '../components/NavBar' // Import the NavBar component

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar /> 
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Where Study Meets AI</h3>
          <p className="mt-4 text-center">The perfect place to study meets with the assistance of artificial intelligence.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
