import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// Create a task
router.post("/create-task", async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTask = await pool.query("INSERT INTO tasks (description) VALUES($1) RETURNING *", [description]);
    res.json(newTask.rows[0]);
  } catch (error) {
    res.json((error as Error).message); // Type assertion to Error
  }
});

// Get all tasks
router.get("/get-tasks", async (req: Request, res: Response) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (error) {
    res.json((error as Error).message); // Type assertion to Error
  }
});

// Get one task
router.get("/get-task/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);
    res.json(task.rows[0]);
  } catch (error) {
    res.json((error as Error).message); // Type assertion to Error
  }
});

// Update a task
router.put("/update-task/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTask = await pool.query("UPDATE tasks SET description = $1 WHERE task_id = $2", [description, id]);
    res.json("Task was updated");
  } catch (error) {
    res.json((error as Error).message); // Type assertion to Error
  }
});

// Delete a task
router.delete("/delete-task/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);
    res.json("Task was deleted");
  } catch (error) {
    res.json((error as Error).message); // Type assertion to Error
  }
});

export default router;
