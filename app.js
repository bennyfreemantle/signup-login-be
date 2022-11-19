import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/users.js";
import todoRouter from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [process.env.DEV_FRONTEND, process.env.PROD_FRONTEND];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Running server on ${PORT}`);
});
