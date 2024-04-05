import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateSetPage() {
  const [cards, setCards] = useState([{ term: '', definition: '' }]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleCardChange = (index, event) => {
    const newCards = [...cards];
    newCards[index][event.target.name] = event.target.value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { term: '', definition: '' }]);
  };

  const saveSet = async (e) => {
    e.preventDefault();
    const formattedCards = cards.map(card => ({
      question: card.term,
      answer: card.definition
    }));
    try {
      const response = await axios.post('http://127.0.0.1:5000/create_set', {
        title: title,
        cards: formattedCards  // Send the cards array
      });
      if (response.status === 201) {
        console.log("Set created successfully:", response.data.message);
        navigate('/flashcards');  // Adjust the route as necessary
      } else {
        console.log("Set creation failed:", response.data.message);
      }
    } catch (error) {
      console.log("Set creation error:", error.response ? error.response.data.message : error.message);
    }
  };


  return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={saveSet}>
        <input type="text" name='set_name' placeholder='Set Name' className='w-full px-3 py-3 mb-7 border rounded-md focus:outline-none focus:border-blue-500'
          onChange={(e) => setTitle(e.target.value)}
        />
        {cards.map((card, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              name="term"
              placeholder="Term"
              value={card.term}
              onChange={(e) => handleCardChange(index, e)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="definition"
              placeholder="Definition"
              value={card.definition}
              onChange={(e) => handleCardChange(index, e)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {index === cards.length - 1 && (
              <button
                onClick={addCard}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Add Card
              </button>
            )}
          </div>
        ))}
        <div className="fixed bottom-4 right-4">
          <button
            type='submit'
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Save Set
          </button>
        </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateSetPage;