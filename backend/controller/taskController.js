import Task from '../models/taskModel.js'


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ due_date: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
};


export const addTask = async (req, res) => {
  try {
    const { title, description, due_date, status } = req.body;


    if (!title || !due_date) {
      return res.status(400).json({ message: 'Title and due date are required.' });
    }

    const newTask = new Task({
      title,
      description,
      due_date,
      status
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding task.' });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

  
    if (!title || !due_date) {
      return res.status(400).json({ message: 'Title and due date are required.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating task.' });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting task.' });
  }
};
