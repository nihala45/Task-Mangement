import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
  });
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      navigate('/login'); 
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/task');
      setTasks(res.data);
    } catch (err) {
      alert('Failed to load tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: '', description: '', due_date: '', status: 'pending' });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.due_date) {
      alert('Title and Due Date are required.');
      return;
    }

    try {
      if (editId) {
        await api.put(`task/${editId}`, form);
      } else {
        await api.post('task', form);
      }
      fetchTasks();
      resetForm();
    } catch (err) {
      alert('Error saving task.');
    }
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        due_date: task.due_date.split('T')[0],
        status: task.status,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`task/${id}`);
        fetchTasks();
        resetForm();
      } catch {
        alert('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (task) {
        await api.put(`task/${id}`, { ...task, status });
        fetchTasks();
      }
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">📋 Task Management</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-10">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task Title *"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded w-full mt-4"
          ></textarea>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
            >
              {editId ? 'Update Task' : 'Add Task'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-purple-100">
              <tr>
                <th className="text-left py-2 px-4">Title</th>
                <th className="text-left py-2 px-4">Due Date</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className={`border-b ${
                      new Date(task.due_date) < new Date() && task.status !== 'completed'
                        ? 'bg-red-100'
                        : ''
                    }`}
                  >
                    <td className="py-2 px-4">{task.title}</td>
                    <td className="py-2 px-4">{task.due_date.split('T')[0]}</td>
                    <td className="py-2 px-4">
                   <select
  value={task.status}
  onChange={(e) => handleStatusChange(task._id, e.target.value)}
  className="border p-1 rounded"
  disabled={task.status === 'completed'}
>
  {task.status === 'pending' ? (
    <>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </>
  ) : task.status === 'in-progress' ? (
    <>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </>
  ) : (
    <option value="completed">Completed</option>
  )}
</select>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
