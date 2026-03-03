import express from "express";
import employeesRouter from "#api/employees";

const app = express();
app.use(express.json());

export default app;

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

/* Mount employees router */
app.use("/employees", employeesRouter);

/* Error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});