import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';

const FlashcardsPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/sets', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        });
        setFlashcardSets(response.data.sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    fetchSets();
  }, []);

  const handleCreateSet = async () => {
    navigate('/create-set');
  };

  const handleSelectSet = (setId) => {
    navigate(`/flashcards/${setId}/practice`);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-center">Flashcard Sets</h3>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" onClick={handleCreateSet}>
              Create Set
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcardSets.map((set, index) => (
              <div key={set.setId} className="bg-gray-50 rounded-lg p-4 shadow">
                <h4 className="text-lg font-semibold mb-2">{set.title}</h4>
                <div
                  className={`p-2 ${
                    selectedSetIndex === index ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  onClick={() => handleSelectSet(set.setId)}
                >
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FlashcardsPage;