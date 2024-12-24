import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeDetails from "./components/employeeDetails";
import TimeSheet from "./components/TimeSheet";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import Dlp from "./components/Dlp";
import Setting from "./components/Setting";
import Behaviour from "./components/Behaviour";
import SalaryPage from "./components/salaryPage";
import FrontPage from "./components/FrontPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmpHome from "./components/EmpHome";
import EmpAttendence from "./components/EmpAttendence";
import EmpDocuments from "./components/EmpDocuments";
import EmpRequest from "./components/EmpRequest";
import LeaveRequest from "./components/LeaveRequest";
import MainDashboard from "./pages/MainDashboard";
import FirstPage from "./components/FrontPage";
import { EmployeeProtectedRoute, ProtectedRoute } from "./pages/ProtectedRoute";
import EmpLeavesChanges from "./components/EmpLeavesChanges";



const App = () => {
  const [authToken, setAuthToken] = useState(null); // Initializing as null
  const [empAuthToken, setEmpToken] = useState(null); // Initializing as null

  // Admin Authentication check on page load
  useEffect(() => {
    const token = localStorage.getItem("userLogin");
    if (token) {
      const parsedUser = JSON.parse(token);
      setAuthToken(parsedUser?.data?.accessToken || "");
    }
  }, []);

  // Employee Authentication check on page load
  useEffect(() => {
    const token = localStorage.getItem("employeeLogin");
    if (token) {
      const parsedUser = JSON.parse(token);
      setEmpToken(parsedUser?.data?.accessToken || "");
    }
  }, []);

  const isEmployeeAuthenticated = !!empAuthToken;
  const isAuthenticated = !!authToken;

  return (
    <div>
      <Routes>
        {/* Protected routes for authenticated admin */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<MainDashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
         path="/employee/leave/changes"
         element={
          <ProtectedRoute
           element={<EmpLeavesChanges/>}
           isAuthenticated={isAuthenticated}
          />
         }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<FirstPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/employee-details"
          element={
            <ProtectedRoute
              element={<EmployeeDetails />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/timesheet"
          element={
            <ProtectedRoute
              element={<TimeSheet />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              element={<Projects />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              element={<Reports />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/dlp"
          element={
            <ProtectedRoute
              element={<Dlp />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute
              element={<Setting />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/behavior"
          element={
            <ProtectedRoute
              element={<Behaviour />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/salary/details"
          element={
            <ProtectedRoute
              element={<SalaryPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="employee/request/leave/approval"
          element={
            <ProtectedRoute
              element={<LeaveRequest />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* Admin routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Employee dashboard routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route
          path="/employee/home"
          element={
            <EmployeeProtectedRoute
              element={<EmpHome />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/attendence"
          element={
            <EmployeeProtectedRoute
              element={<EmpAttendence />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/documents"
          element={
            <EmployeeProtectedRoute
              element={<EmpDocuments />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/request/leave"
          element={
            <EmployeeProtectedRoute
              element={<EmpRequest />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        {/* Public routes */}
        <Route path="/frontpage" element={<FrontPage />} />{" "}
        {/* Ensure front page is public route */}
      </Routes>
    </div>
  );
};

export default App;
