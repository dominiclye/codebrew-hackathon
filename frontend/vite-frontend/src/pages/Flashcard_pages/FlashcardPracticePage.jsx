import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FlashcardPracticePage = () => {
  const { setId } = useParams();
  const [flashcardSet, setFlashcardSet] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/sets/${setId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        });
        setFlashcardSet(response.data);
        console.log(flashcardSet)
        setReveal(false); 
      } catch (error) {
        console.error('Error fetching flashcard set:', error);
      }
    };

    fetchFlashcardSet();
  }, [setId]);

  const handleRevealClick = () => {
    setReveal(!reveal); 
  };

  const handleNextClick = () => {
    setReveal(false); 
    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcardSet.cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousClick = () => {
    setReveal(false); 
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <>
    <NavBar/>
    <div className="container mx-auto my-10 p-5">
      {flashcardSet && (
        <>
          <h1 className="text-4xl text-center font-bold mb-6">{flashcardSet.title}</h1>
          <div className="flex flex-col items-center">
            <div className="flashcard bg-white p-10 rounded-lg shadow-md w-96 mb-4">
              <div className="flashcard-term text-2xl font-semibold">{flashcardSet.cards[currentCardIndex].question}</div>
              {reveal && <div className="flashcard-definition text-lg mt-4">{flashcardSet.cards[currentCardIndex].answer}</div>}
            </div>
            <button onClick={handleRevealClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-200">{reveal ? 'Hide' : 'Reveal'} Answer</button>
          </div>
          <div className="flex justify-between max-w-xs mx-auto">
            <button onClick={handlePreviousClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50" disabled={currentCardIndex === 0}> Previous </button>
            <button onClick={handleNextClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50" disabled={currentCardIndex === flashcardSet.cards.length - 1}>Next</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default FlashcardPracticePage;