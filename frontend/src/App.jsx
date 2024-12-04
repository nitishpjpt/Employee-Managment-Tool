import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import EmployeeDetails from "./components/employeeDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="employee-details" element={<EmployeeDetails />}></Route>
      </Routes>
    </div>
  );
};

export default App;
