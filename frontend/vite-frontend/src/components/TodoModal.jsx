import React, { useState } from 'react';
import axios from 'axios';

const TodoModal = ({ setShowModal }) => {
    const [listName, setListName] = useState('');
    const [tasks, setTasks] = useState([{ title: '', description: '', due_date: '' }]);

    const handleAddTask = () => {
        setTasks([...tasks, { title: '', description: '', due_date: '' }]);
    };

    const handleTaskChange = (index, field, value) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, [field]: value };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleSubmit = async () => {
        const formattedTasks  = tasks.map(task => ({
            title: task.title,
            description: task.description
          }));
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/create_list',
                { title: listName, tasks:[], user_id: localStorage.getItem('user_id') },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            );
            setShowModal(false);
        } catch (error) {
            console.error('Failed to create todo list', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-5 w-96">
                <h3 className="text-lg font-semibold">Create a New Todo List</h3>
                <input
                    type="text"
                    placeholder="List Name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    className="w-full p-2 my-2 border rounded"
                />
                {tasks.map((task, index) => (
                    <div key={index} className="my-2">
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={task.title}
                            onChange={(e) => handleTaskChange(index, 'title', e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Task Description"
                            value={task.description}
                            onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="date"
                            value={task.due_date}
                            onChange={(e) => handleTaskChange(index, 'due_date', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}
                <button
                    onClick={handleAddTask}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                >
                    Add Task
                </button>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;