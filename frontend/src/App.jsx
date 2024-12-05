import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import EmployeeDetails from "./components/employeeDetails";
import TimeSheet from "./components/TimeSheet";
import MainDashboard from "../src/pages/MainDashboard";
import TimeClaim from "./components/TimeClaim";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import Dlp from "./components/Dlp";
import Setting from "./components/Setting";
import Behaviour from "./components/Behaviour";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="employee-details" element={<EmployeeDetails />}></Route>
        <Route path="timesheet" element={<TimeSheet />}></Route>
        <Route path="time-claim" element={<TimeClaim />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route path="/dlp" element={<Dlp />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/behavior" element={<Behaviour />}></Route>
      </Routes>
    </div>
  );
};

export default App;
