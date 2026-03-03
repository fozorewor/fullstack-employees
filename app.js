import express from "express";
import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
} from "#db/queries/employees";

const app = express();
app.use(express.json());

export default app;

/* ROOT ROUTE */
app.get("/", (req, res) => {
    res.send("Welcome to the Fullstack Employees API.");
});

/* GET all employees */
app.get("/employees", async (req, res, next) => {
    try {
        const employees = await getEmployees();
        res.json(employees);
    } catch (err) {
        next(err);
    }
});

/* GET single employee */
app.get("/employees/:id", async (req, res, next) => {
    try {
        const employee = await getEmployee(req.params.id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json(employee);
    } catch (err) {
        next(err);
    }
});

/* CREATE employee */
app.post("/employees", async (req, res, next) => {
    try {
        if (!req.body || !req.body.name || !req.body.birthday || !req.body.salary) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const employee = await createEmployee(req.body);
        res.status(201).json(employee);
    } catch (err) {
        next(err);
    }
});

/* UPDATE employee */
app.put("/employees/:id", async (req, res, next) => {
    try {
        if (
            !req.body ||
            req.body.name === undefined ||
            req.body.birthday === undefined ||
            req.body.salary === undefined
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updated = await updateEmployee({
            id: req.params.id,
            ...req.body,
        });

        if (!updated) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
});

/* DELETE employee */
app.delete("/employees/:id", async (req, res, next) => {
    try {
        const deleted = await deleteEmployee(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // TEST EXPECTS 204
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

/* Error handler */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
});