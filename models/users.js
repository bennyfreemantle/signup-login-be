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
