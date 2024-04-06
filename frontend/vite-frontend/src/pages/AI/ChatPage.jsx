import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';

const ChatPage = () => {
    const [inputText, setInputText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleGenFlashcards = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/ai_flashcards', {prompt: inputText}, { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            const botMessage = {
                sender: 'bot',
                message: response.data.message
            };
            setChatMessages([...chatMessages, botMessage]);
        } catch (error) {
            console.error('Error generating flashcards:', error);
        }
    }

    const handleSendMessage = async () => {
        if (!inputText) return;

        const newMessage = {
            sender: 'user',
            message: inputText
        };

        setChatMessages([...chatMessages, newMessage]);
        setInputText('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/generate_response', { prompt: inputText }, { 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            const botMessage = {
                sender: 'bot',
                message: response.data.message
            };
            setChatMessages([...chatMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBar/>
            <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-6">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.sender === 'bot' ? 'flex justify-start' : 'flex justify-end'}`}>
                        
                        <div className={`${msg.sender === 'bot' ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-lg py-2 px-4 max-w-xs shadow-md`}>
                            <p className='font-bold text-blue'>MutableBot</p>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 bg-white rounded-full py-2 px-4 mr-4 shadow-md" placeholder="Type your message here..."/>
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                    Send
                </button>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={handleGenFlashcards}>Generate Flashcards</button>
            </div>
        </div>

    );
};

export default ChatPage;

