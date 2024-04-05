import React, { useState } from 'react';
import NavBar from '../components/NavBar';

// Placeholder data for the flashcard sets
const flashcardSets = [
  {
    id: 1,
    title: 'JavaScript Essentials',
    cards: [
      { term: 'Variable', definition: 'A named space in memory that stores data.' },
      { term: 'Function', definition: 'A block of code designed to perform a particular task.' },
    ],
  },
  {
    id: 2,
    title: 'HTML Basics',
    cards: [
      { term: 'Element', definition: 'An individual component of an HTML document.' },
      { term: 'Tag', definition: 'The special set of characters that indicates the start and end of an HTML element.' },
    ],
  },
  // ... more sets as needed
];

function FlashcardsPage() {
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);

  // Handler for creating a new flashcard set
  const handleCreateSet = () => {
    // This would be replaced with a method for creating a new set,
    // possibly showing a form to the user or navigating to a different page.
    console.log('Creating a new flashcard set...');
  };

  // Function to handle selecting a flashcard set
  const handleSelectSet = (index) => {
    setSelectedSetIndex(index);
  };

  return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-center">Flashcard Sets</h3>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleCreateSet}
          >
            Create Set
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcardSets.map((set, index) => (
            <div key={set.id} className="bg-gray-50 rounded-lg p-4 shadow">
              <h4 className="text-lg font-semibold mb-2">{set.title}</h4>
              {set.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className={`p-2 border-b last:border-b-0 ${
                    selectedSetIndex === index ? 'text-gray-900' : 'text-gray-500'
                  }`}
                  onClick={() => handleSelectSet(index)}
                >
                  <div className="font-medium">{card.term}</div>
                  {selectedSetIndex === index && (
                    <div className="text-sm">{card.definition}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default FlashcardsPage;