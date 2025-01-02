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
import EmpSalaryManagement from "./components/EmpSalaryManagment";
import EmpDailyAttendence from "./components/EmpDailyAttendence";
import Payroll from "./components/Payroll";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [empAuthToken, setEmpAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unified Authentication Check
  useEffect(() => {
    const fetchTokens = () => {
      const adminToken = localStorage.getItem("userLogin");
      const employeeToken = localStorage.getItem("employeeLogin");

      if (adminToken) {
        try {
          const parsedAdmin = JSON.parse(adminToken);
          setAuthToken(parsedAdmin?.data?.accessToken || "");
        } catch (error) {
          console.error("Error parsing admin token:", error);
        }
      }

      if (employeeToken) {
        try {
          const parsedEmployee = JSON.parse(employeeToken);
          setEmpAuthToken(parsedEmployee?.data?.accessToken || "");
        } catch (error) {
          console.error("Error parsing employee token:", error);
        }
      }

      setLoading(false); // Set loading to false after tokens are checked
    };

    fetchTokens();
  }, []);

  const isAuthenticated = !!authToken; // Admin authentication status
  const isEmployeeAuthenticated = !!empAuthToken; // Employee authentication status

  // Show loading while checking tokens
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        {/* Admin Protected Routes */}
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
              element={<EmpLeavesChanges />}
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
        <Route
          path="/employee/salary/management"
          element={
            <ProtectedRoute
              element={<EmpSalaryManagement />}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
          path="/employee/daily/attendance"
          element={
            <ProtectedRoute
              element={<EmpDailyAttendence />}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
        path="/employee/payroll"
        element={
          <ProtectedRoute
           element={<Payroll/>}
           isAuthenticated={isAuthenticated}
          />
        }
        >

        </Route>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />

        {/* Employee Protected Routes */}
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
      </Routes>
    </div>
  );
};

export default App;
