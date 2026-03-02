import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [
    { name: "Alice Johnson", birthday: "1990-04-12", salary: 60000 },
    { name: "Bob Smith", birthday: "1985-09-23", salary: 75000 },
    { name: "Carol Davis", birthday: "1992-01-15", salary: 55000 },
    { name: "Daniel Brown", birthday: "1988-06-30", salary: 82000 },
    { name: "Emily Wilson", birthday: "1995-11-10", salary: 50000 },
    { name: "Frank Miller", birthday: "1983-03-05", salary: 90000 },
    { name: "Grace Lee", birthday: "1991-07-19", salary: 67000 },
    { name: "Henry Clark", birthday: "1987-12-01", salary: 72000 },
    { name: "Isabella Hall", birthday: "1993-05-22", salary: 58000 },
    { name: "Jack Young", birthday: "1989-08-14", salary: 76000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
