import jwt from "jsonwebtoken";
import { getUserById } from "../models/users.js";

export async function requireAuth(req, res, next) {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    // no auth was sent to the API
    return res.status(401).json({
      error: "Authorization token required",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    // verify our token with our secret key
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await getUserById(id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Request is not authorized",
    });
  }
}
