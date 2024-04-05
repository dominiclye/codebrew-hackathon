import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function CreateFlashcardPage() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually make an API call to the backend to create a new flashcard
    console.log('Submitting new flashcard:', { term, definition });
    // Reset the form fields
    setTerm('');
    setDefinition('');
  };

  return (
    <>
    <NavBar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center mb-4">Create a New Flashcard</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="term" className="text-sm font-medium">Term</label>
            <input
              type="text"
              id="term"
              placeholder="Enter term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="definition" className="text-sm font-medium">Definition</label>
            <textarea
              id="definition"
              placeholder="Enter definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Create Flashcard
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateFlashcardPage;