import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { createTodo, getTodos } from "../models/todo.js";

const todoRouter = express.Router();

// use requireAuth middleware to validate a request has been made by
// a real user i.e has a sent a valid JWT token with the request
todoRouter.use(requireAuth);

// * GET ALL TODOS A USER WITH (user_id) HAS
todoRouter.get("/", async (req, res) => {
  // Get the id of the user who made the quest
  // We get this from our requireAuth hook
  // as we destructure out id from the token when verifying its valid
  // and add it our request object
  const user_id = req.user.id;
  try {
    const todos = await getTodos(user_id);
    res.status(200).json({ payload: todos });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

todoRouter.post("/", async (req, res) => {
  const { input } = req.body;
  const user_id = req.user.id;
  try {
    const todos = await createTodo(input, user_id);
    res.status(200).json({ payload: todos });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
  // res.status(200).json({ payload: { id: 123123123, todo_name: "todos" } });
});

export default todoRouter;
