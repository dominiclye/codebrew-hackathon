import React, { useState } from 'react';
import NavBar from '../../components/NavBar'; // Adjust the import path as necessary

const TaskModal = ({ isOpen, onClose, onSubmit, initialDescription = '', initialDueDate = '', editingId = null }) => {
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, dueDate })
    });

    if (response.ok) {
        // Clear form and refetch tasks
        setDescription('');
        setDueDate('');
        fetchTasks();
    } else {
        // Handle errors
    }
};


  // Reset form when opening the modal
  React.useEffect(() => {
    if (isOpen) {
      setDescription(initialDescription);
      setDueDate(initialDueDate);
    }
  }, [isOpen, initialDescription, initialDueDate]);

  if (!isOpen) return null;

  return (
    <form className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50" onSubmit={handleSubmit}>
      <div className="bg-white p-8 rounded shadow-md">
        <h3 className="text-lg font-bold">{editingId ? 'Edit Task' : 'Create New Task'}</h3>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-2 mb-4 border rounded"
        />
        <label htmlFor="dueDate">Due Date (optional)</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 mt-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {editingId ? 'Save Changes' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditingTask, setCurrentEditingTask] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleCreateOrEditTask = ({ id, description, dueDate }) => {
    if (id) {
      // Edit existing task
      setTasks(tasks.map(task => task.id === id ? { ...task, description, dueDate } : task));
    } else {
      // Create new task
      const newTask = {
        id: Math.random(),
        description,
        dueDate,
        completed: false
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const openEditModal = (task) => {
    setCurrentEditingTask(task);
    toggleModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-center">My Tasks</h2>
        <div className="mt-4">
          {tasks.map(task => (
            <div key={task.id} className={`flex items-center p-4 mt-2 ${task.completed ? 'bg-green-100' : 'bg-blue-100'} rounded-md shadow`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                className="mr-4"
              />
              <div className="flex-1">
                <p className={`${task.completed ? 'line-through' : ''}`}>{task.description}</p>
                {task.dueDate && <p className={`text-sm ${task.completed ? 'line-through' : ''}`}>Due by: {task.dueDate}</p>}
              </div>
              <button
                onClick={() => openEditModal(task)}
                className="p-2 rounded text-white bg-gray-500 hover:bg-gray-600"
              >
                Edit
              </button>
            </div>
          ))}
          <button
            className="w-full p-4 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              setCurrentEditingTask(null); // Reset editing task to null for creating a new task
              toggleModal();
            }}
          >
            Create New Task
          </button>
        </div>
      </div>
      <TaskModal
        isOpen={modalOpen}
        onClose={toggleModal}
        onSubmit={handleCreateOrEditTask}
        initialDescription={currentEditingTask ? currentEditingTask.description : ''}
        initialDueDate={currentEditingTask ? currentEditingTask.dueDate : ''}
        editingId={currentEditingTask ? currentEditingTask.id : null}
      />
    </div>
  );
};

export default TasksPage;
