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
