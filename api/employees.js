import express from "express";
const router = express.Router();
export default router;

// TODO: this file!

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

/* GET all employees */
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

/* GET single employee */
router.get("/:id", async (req, res, next) => {
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
router.post("/", async (req, res, next) => {
  try {
    if (
      !req.body ||
      req.body.name === undefined ||
      req.body.birthday === undefined ||
      req.body.salary === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

/* UPDATE employee */
router.put("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
