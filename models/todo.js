import query from "../db/index.js";

// GET all users in our database (testing purposes)
export async function getTodos(user_id) {
  try {
    const todos = await query(`SELECT * FROM todos WHERE $1 = user_id;`, [
      user_id,
    ]);
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

export async function editTodo(editedTodo, user_id) {
  try {
    const todos = await query(
      `UPDATE todos SET todo_name = COALESCE($1, todo_name) WHERE id = $2 RETURNING *;`,
      [editedTodo, user_id]
    );
    return todos.rows[0];
  } catch (error) {
    return error;
  }
}

export async function deleteTodo(user_id) {
  try {
    const todos = await query(`DELETE FROM todos WHERE id = $1 RETURNING *;`, [
      user_id,
    ]);
    return todos.rows[0];
  } catch (error) {
    return error;
  }
}
