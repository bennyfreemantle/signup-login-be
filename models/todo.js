import query from "../db/index.js";

// GET all users in our database (testing purposes)
export async function getTodos(id) {
  try {
    const todos = await query(`SELECT * FROM todos WHERE $1 = user_id;`, [id]);
    return todos.rows;
  } catch (error) {
    return error;
  }
}

// POST a new todo to the database
export async function createTodo(input, user_id) {
  try {
    const todos = await query(
      `INSERT INTO todos (todo_name, user_id) VALUES ($1, $2) RETURNING *;`,
      [input, user_id]
    );
    return todos.rows[0];
  } catch (error) {
    return error;
  }
}
