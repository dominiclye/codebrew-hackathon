import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  
  const authStatus = async (e) => {
    const response = await axios.get("http://127.0.0.1:5000/protected", { 
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    try{
      alert(response.data.isAuthenticated);
    }catch(err){
      console.log(err);
    }
  }

  function logout() {
    localStorage.removeItem('user_id');
    window.location.reload();
  }

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
            <Link to="/flashcards" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">Flashcards</Link>
            <a to="/settings" className="my-1 text-gray-700 hover:text-blue-600 md:mx-4 md:my-0">Settings</a>
            <button onClick={authStatus}>Auth Status</button>
            <button onClick={logout}>logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
