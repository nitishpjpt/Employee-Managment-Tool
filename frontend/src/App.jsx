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
import ProtectedRoute from "./pages/ProtectedRoute";
import MainDashboard from "./pages/MainDashboard";

const App = () => {
  const [authToken, setAuthToken] = useState("");

  // admin Authentication check
  useEffect(() => {
    const token = localStorage.getItem("userLogin");
    if (token) {
      const parsedUser = JSON.parse(token);
      setAuthToken(parsedUser?.data?.accessToken || "");
    }
  }, []);

  const isAuthenticated = !!authToken;

  return (
    <div>
      <Routes>
        {/* Protected routes for authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<MainDashboard />}
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

        {/* Employee routes */}
        {/* EmployeeLogin */}
        <Route
          path="/employee/login"
          element={<ProtectedRoute element={<EmployeeLogin />} />}
          isAuthenticated={isAuthenticated}
        />
        <Route
          path="/employee/home"
          element={<ProtectedRoute element={<EmpHome />} />}
          isAuthenticated={isAuthenticated}
        />
        <Route
          path="/employee/attendence"
          element={<ProtectedRoute element={<EmpAttendence />} />}
          isAuthenticated={isAuthenticated}
        />
        <Route
          path="/employee/documents"
          element={<ProtectedRoute element={<EmpDocuments />} />}
          isAuthenticated={isAuthenticated}
        />
        <Route
          path="/employee/request/leave"
          element={<ProtectedRoute element={<EmpRequest />} />}
          isAuthenticated={isAuthenticated}
        />

        {/* Public routes */}
        <Route path="/" element={<login />} />
      </Routes>
    </div>
  );
};

export default App;
