import express from 'express';
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
} from '../controller/taskController.js'

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;