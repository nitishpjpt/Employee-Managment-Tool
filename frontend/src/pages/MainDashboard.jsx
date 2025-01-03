import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiListSettingsLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { FcLeave } from "react-icons/fc";
import FrontPage from "../components/FrontPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdCoPresent } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Dashboard() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [presentCount, setPresentCount] = useState(0); // State to store present count
  const [absentCount, setAbsentCount] = useState(0); // State to stor

  // function to get the total present employee count
  useEffect(() => {
    const getPresentEmployee = async () => {
      try {
        console.log("Fetching present employee count..."); // Ensure this log is printed
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/attendance/present/count`
        ); // Log the response here
        setPresentCount(response.data.presentCount);
      } catch (err) {
        console.error("Error fetching present employees:", err);
      }
    };
    getPresentEmployee();
  }, []);

  // function to get the total absent employee count
  useEffect(() => {
    const getAbsentEmployee = async () => {
      try {
        console.log("Fetching present employee count..."); // Ensure this log is printed
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/attendance/absent/count`
        );
        console.log(response.data); // Log the response here
        setAbsentCount(response.data.absentCount);
      } catch (err) {
        console.error("Error fetching present employees:", err);
      }
    };
    getAbsentEmployee();
  }, []);

  //toggle drop down
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("user is clicked");
  };

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // navigate on onclick
  const handleNavigation = (path) => {
    navigate(path);
  };

  // function to get the local storage data
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.data.userResponse.username || "Unknown User",
          email: parsedUser.data.userResponse.email || "unknown@example.com",
        });
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  //funciton to delete login data from localstorage
  const handleLogout = () => {
    const getUser = localStorage.getItem("userLogin");
    if (getUser) {
      try {
        localStorage.removeItem("userLogin");
        toast.success("Admin logout successfully!", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/login"); // Navigate to login page
            setTimeout(() => {
              window.location.reload(); // Reload the page after navigation
            }, 100); // Add a slight delay to ensure navigation is complete
          },
        });
      } catch (error) {
        toast.error("Admin logout failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // function to get total present employee number

  const [showSettingsOptions, setShowSettingsOptions] = useState(false);

  const toggleSettingsOptions = () => {
    setShowSettingsOptions((prev) => !prev);
  };
  // conext for total project
  const { totalProject } = useContext(ProjectContext);
  //context for total registered user
  const { totalEmployee } = useContext(EmployeeContext);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <FaHome className="text-3xl text-[#233D7A]" />,
      path: "/home",
    },
    {
      text: "Employees",
      icon: <BsPersonCircle className="text-3xl text-[#233D7A]" />,
      path: "/employee-details",
    },
    {
      text: "Timesheet",
      icon: <SlCalender className="text-2xl text-[#233D7A]" />,
      path: "/timesheet",
    },

    {
      text: "Projects",
      icon: <HiOutlineDocumentReport className="text-3xl text-[#233D7A]" />,
      path: "/projects",
    },
    {
      text: "Reports",
      icon: <RiListSettingsLine className="text-3xl text-[#233D7A]" />,
      path: "/reports",
    },

    {
      text: "Settings",
      icon: <IoMdSettings className="text-3xl text-[#233D7A]" />,
      onClick: toggleSettingsOptions, // Toggle settings options
    },
    {
      text: "Update Leave Balance",
      icon: <MdPerson className="text-3xl text-[#233D7A]" />,
      path: "/employee/leave/changes",
    },
    {
      text: "Salary Management",
      icon: <RiMoneyRupeeCircleFill className="text-3xl text-[#233D7A]" />,
      path: "/employee/salary/management",
    },
    {
      text: "Daily Attendance",
      icon: <MdCoPresent className="text-3xl text-[#233D7A]" />,
      path: "/employee/daily/attendance",
    },
  ];

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>

            {/* <!-- Dropdown menu --> */}

            <div className="flex w-full justify-end gap-4">
              <h3 className="flex justify-center items-center gap-2">
                <Link
                  className="flex gap-2"
                  to="/employee/request/leave/approval"
                >
                  Pending Requests{" "}
                  <MdOutlinePendingActions className="text-2xl " />
                </Link>
              </h3>
              {/* Avatar Button */}
              <img
                id="avatarButton"
                onClick={toggleDropdown}
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                class="w-10 h-10 rounded-full cursor-pointer"
                src="data:image/jpeg;base64,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"
                alt="User dropdown"
              />

              {/* Dropdown */}
              <div
                id="userDropdown"
                className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-200 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-3 font-semibold text-sm text-gray-900 dark:text-white">
                  <div className="font-semibold">
                    {user ? user.name : <Link to="/login">Login</Link>}
                  </div>
                  <div className="font-medium truncate">
                    {user ? user.email : ""}
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      to="/home"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee-details"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Employee
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee/Login"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Login as employee
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader className="bg-[#1976D2] shadow-lg">
            <h1 className="text-xl font-bold text-center  pr-6 text-white">
              <Link to="/home">Deepnap Softech</Link>
            </h1>
          </DrawerHeader>

          <List className="border-none">
            {menuItems.map(({ text, icon, path, onClick }) => (
              <ListItem
                className="p-1"
                key={text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                  onClick={onClick || (() => handleNavigation(path))}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 2 } : { mr: "auto" },
                    ]}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2 }}>
            {/* <!-- Statistics Cards --> */}
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              <div class="bg-[#848DFF] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div class="text-right">
                  <p class="text-xl">{totalEmployee}</p>
                  <p>Total Enrollments</p>
                </div>
              </div>
              <div class="bg-[#E371B4] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div class="text-right">
                  <p class="text-xl">{totalProject}</p>
                  <p>Total Projects</p>
                </div>
              </div>

              <div class="bg-[#FC8188] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div class="text-right">
                  <p class="text-2xl">{presentCount}</p>
                  <p>Present</p>
                </div>
              </div>
              <div class="bg-[#51BAD6] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div class="text-right">
                  <p class="text-2xl">{absentCount}</p>
                  <p>Absent</p>
                </div>
              </div>
            </div>
            {/* ---------table=============== */}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
