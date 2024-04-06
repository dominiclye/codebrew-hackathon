import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoModal from '../../components/TodoModal';
import NavBar from '../../components/NavBar';

const TodoList = () => {
    const [lists, setLists] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/lists', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
                setLists(response.data.lists);
            } catch (error) {
                console.error('Error fetching todo lists:', error);
            }
        };

        fetchLists();
    }, []);

    return (
        <>
            <NavBar />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Task
                    </button>
                </div>
                <ul>
                    {lists.map((list) => (
                        <li key={list.id} className="mb-4 p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">{list.title}</h2>
                            <p>{list.description}</p>
                            <p>Due: {new Date(list.dueDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
                {showModal && <TodoModal setShowModal={setShowModal} />}
            </div>
        </>
    );
};

export default TodoList;