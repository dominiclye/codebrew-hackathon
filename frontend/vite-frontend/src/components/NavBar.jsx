import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">
              <a className="text-gray-800 text-xl font-bold hover:text-gray-700 md:text-2xl">Mutable Learning</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:mx-6">
            <a to="/account" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">Account</a>
            <a to="/ai-tutor" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">AI Tutor</a>
            <a to="/todo-list" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">To-do List</a>
            <a to="/flashcards" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">Flashcards</a>
            <a to="/settings" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
