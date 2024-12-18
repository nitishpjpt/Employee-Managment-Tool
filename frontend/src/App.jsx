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
import SalaryPage from "./components/salaryPage";
import FrontPage from "./components/FrontPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmpDashboard from "./pages/EmpDashboard";
import EmpAttendence from "./components/EmpAttendence";
import EmpDocuments from "./components/EmpDocuments";
import EmpRequest from "./components/EmpRequest";
import EmpHome from "./components/EmpHome";

const App = () => {
  return (
    <div>
      <Routes>
        // admin register page
        <Route path="/register" element={<Register />}></Route>
        // employee login page
        <Route path="/employee/login" element={<EmployeeLogin />}></Route>
        // employee dashboard page
        <Route path="/employee/home" element={<EmpHome/>}></Route>
        // employee attendence
        <Route path="/employee/attendence" element={<EmpAttendence />}></Route>
        // employee documents
        <Route path="/employee/documents" element={<EmpDocuments />}></Route>
        //employee request
        <Route path="/employee/request/leave" element={<EmpRequest/>}></Route>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/employee-details" element={<EmployeeDetails />}></Route>
        <Route path="timesheet" element={<TimeSheet />}></Route>
        <Route path="time-claim" element={<TimeClaim />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route path="/dlp" element={<Dlp />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        <Route path="/behavior" element={<Behaviour />}></Route>
        <Route path="/salary/details" element={<SalaryPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
