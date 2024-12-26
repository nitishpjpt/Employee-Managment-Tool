import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpActivityTracker from "../components/EmpActivityTracker";


function EmpDashboard() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeTime, setActiveTime] = useState(0); // State to store active time

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [empId,setEmpId] = useState("");

  const navigate = useNavigate(); // to navigate after logout

  // Menu open and close handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Set user data from local storage or other source
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser.data.userResponse.firstName);
        setUsername(parsedUser.data.userResponse.firstName);
        setEmail(parsedUser.data.userResponse.email);
        setEmployeeId(parsedUser.data.userResponse._id);
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // In your frontend code (e.g., EmpDashboard.jsx)
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL }/api/v1/user/${employeeId}/logout`
      );
      console.log(response.data);
      localStorage.removeItem("employeeLogin");
      toast.success("Employee logout successfully!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          navigate("/employee/login"); // Navigate to login page
          setTimeout(() => {
            window.location.reload(); // Reload the page after navigation
          }, 100); // Add a slight delay to ensure navigation is complete
        },
       
      });
      // Perform any additional actions like redirecting or removing from localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

   // First useEffect to get employeeId from localStorage
   useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setEmpId(parsedUser.data.userResponse._id); // Set empId from parsed data
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // Second useEffect to fetch active time once empId is available
  useEffect(() => {
    if (empId) { // Only run if empId is available
      const fetchActiveTime = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/employee/${empId}/active/time`
          );
          setActiveTime(response.data.activeTime); // Set active time to state
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching active time:", error);
        }
      };

      fetchActiveTime(); // Fetch active time on component mount
    }
  }, [empId]); // Dependency array includes empId to run only when empId changes


  return (
    <div>
      <ToastContainer />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/employee/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Deepnap Softech
            </Typography>

            {/* Mobile Menu Button */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/employee/home" className="block px-4 py-2">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/employee/attendence" className="block px-4 py-2">
                    View Attendance
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/employee/request/leave"
                    className="block px-4 py-2"
                  >
                    Request Leave
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/employee/documents" className="block px-4 py-2">
                    Documents
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/employee/home" className="block px-4 py-2">
                Home
              </Link>
              <Link to="/employee/attendence" className="block px-4 py-2">
                View Attendance
              </Link>
              <Link to="/employee/request/leave" className="block px-4 py-2">
                Request Leave
              </Link>
              <Link to="/employee/documents" className="block px-4 py-2">
                Documents
              </Link>
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              {username ? username : ""}{" "}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <div className="border-b-2">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {username ? username : ""}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {email ? email : ""}
                    </Typography>
                  </MenuItem>
                </div>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <button onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <p>Active Time: {activeTime}</p>
      <EmpActivityTracker/>
    </div>
  );
}

export default EmpDashboard;
