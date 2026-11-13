const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/leaveDB")
  .then(() => console.log("MongoDB Connected"));

// Leave model
const Leave = mongoose.model(
  "Leave",
  new mongoose.Schema({
    employeeId: String,
    type: String,
    days: Number,
    appliedDate: { type: Date, default: Date.now },
  }),
);

const defaultLeave = {
  Casual: 12,
  Medical: 8,
};

// Apply for leave
app.post("/apply", async (req, res) => {
  const { employeeId, type, days } = req.body;

  if (
    !employeeId ||
    !defaultLeave[type] ||
    !Number.isInteger(Number(days)) ||
    Number(days) <= 0
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const leave = new Leave({
    employeeId,
    type,
    days: Number(days),
  });

  await leave.save();

  res.json({ message: "Leave applied successfully" });
});

// Check leave balance
app.get("/balance/:employeeId", async (req, res) => {
  const leaves = await Leave.find({
    employeeId: req.params.employeeId,
  });

  let used = { Casual: 0, Medical: 0 };

  leaves.forEach((l) => {
    used[l.type] += l.days;
  });

  res.json({
    Casual: defaultLeave.Casual - used.Casual,
    Medical: defaultLeave.Medical - used.Medical,
  });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

