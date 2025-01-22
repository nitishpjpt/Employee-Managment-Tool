import { Employee } from "../modules/employee_modules.js";

const addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).send("Employee not found");

    employee.notes.push({ text });
    await employee.save();

    res.status(200).send(employee.notes);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).send("Employee not found");

    res.status(200).send(employee.notes);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { getNotes, addNote };
