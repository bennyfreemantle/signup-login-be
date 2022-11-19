import query from "../db/index.js";

// GET all users in our database (testing purposes)
export async function getUsers() {
  try {
    const users = await query(`SELECT * FROM users;`);
    return users.rows;
  } catch (error) {
    return error;
  }
}

export async function getUserById(id) {
  try {
    const user = await query("SELECT id FROM users WHERE id = $1", [id]);
    return user.rows[0];
  } catch (error) {
    return error;
  }
}
