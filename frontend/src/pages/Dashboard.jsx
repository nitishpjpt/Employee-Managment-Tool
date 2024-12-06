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
import DashTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoMdTimer } from "react-icons/io";
import { GoProject } from "react-icons/go";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiListSettingsLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { useState, useEffect } from "react";

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
  const [open, setOpen] = React.useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data.date);
        console.log(parsedUser.data.date);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className="bg-[#66A2FF]" position="fixed" open={open}>
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
          <Typography variant="h6" noWrap component="div">
            EMP Monitor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            ~~~
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {[
            {
              text: "Dashboard",
              icon: <FaHome className="text-3xl text-[#233D7A]" />,
              path: "/dashboard",
            },
            {
              text: "Employee",
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
              icon: <IoMdTimer className="text-3xl text-[#233D7A]" />,
              path: "/time-claim",
            },
            {
              text: "Settings",
              icon: <GoProject className="text-3xl text-[#233D7A]" />,
              path: "/projects",
            },
            {
              text: "Reports",
              icon: (
                <HiOutlineDocumentReport className="text-3xl text-[#233D7A]" />
              ),
              path: "/reports",
            },
            {
              text: "DLP",
              icon: <RiListSettingsLine className="text-3xl text-[#233D7A]" />,
              path: "/dlp",
            },
            {
              text: "Setting",
              icon: <IoMdSettings className="text-3xl text-[#233D7A]" />,
              path: "/setting",
            },
            {
              text: "Behaviour",
              icon: <MdPerson className="text-3xl text-[#233D7A]" />,
              path: "/behavior",
            },
          ].map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
                onClick={() => handleNavigation(path)}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    open ? { mr: 3 } : { mr: "auto" },
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
          <div class="grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 p-4 gap-4">
            <div class="bg-[#848DFF] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-xl">{user}</p>
                <p>Total Enrollments</p>
              </div>
            </div>
            <div class="bg-[#E371B4] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-xl">55</p>
                <p>Currently active</p>
              </div>
            </div>
            <div class="bg-[#00DCCE] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-xl">45</p>
                <p>Currently idle</p>
              </div>
            </div>
            <div class="bg-[#FF9A19] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-xl">10</p>
                <p>Currently offline</p>
              </div>
            </div>
            <div class="bg-[#FC8188] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-2xl">4</p>
                <p>Absent</p>
              </div>
            </div>
            <div class="bg-[#51BAD6] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div class="text-right">
                <p class="text-2xl">1</p>
                <p>Suspended</p>
              </div>
            </div>
          </div>
          {/* ---------table=============== */}
          <div>
            <DashTable />
          </div>

          {/* ------Productive---employeee---table=============== */}

          <div className="grid lg:grid-cols-2 md:grid-cols-1">
            <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
              <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
                Top 10 Productive Employees
              </h1>
              <form class="text-center flex flex-row">
                <label
                  for="small"
                  class=" font-semibold text-sm  text-gray-900 dark:text-white"
                >
                  Select Status
                </label>
                <select
                  id="small"
                  class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Location</option>
                  <option value="US">See all</option>
                  <option value="CA">Not started</option>
                  <option value="FR">In progress</option>
                  <option value="DE">Hold</option>
                  <option value="DE">Completed</option>
                </select>
                <label
                  for="small"
                  class=" font-semibold text-sm  text-gray-900 dark:text-white"
                >
                  Select Status
                </label>
                <select
                  id="small"
                  class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Location</option>
                  <option value="US">See all</option>
                  <option value="CA">Not started</option>
                  <option value="FR">In progress</option>
                  <option value="DE">Hold</option>
                  <option value="DE">Completed</option>
                </select>
              </form>

              {/*----------table-------------*/}
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Employee Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Time(hours)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Abhi
                    </th>
                    <td class="px-6 py-4">10hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
              <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
                Top 10 Non Productive Employees
              </h1>
              <form class="text-center flex flex-row">
                <label
                  for="small"
                  class=" font-semibold text-sm  text-gray-900 dark:text-white"
                >
                  Select Status
                </label>
                <select
                  id="small"
                  class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Location</option>
                  <option value="US">See all</option>
                  <option value="CA">Not started</option>
                  <option value="FR">In progress</option>
                  <option value="DE">Hold</option>
                  <option value="DE">Completed</option>
                </select>
                <label
                  for="small"
                  class=" font-semibold text-sm  text-gray-900 dark:text-white"
                >
                  Select Status
                </label>
                <select
                  id="small"
                  class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Location</option>
                  <option value="US">See all</option>
                  <option value="CA">Not started</option>
                  <option value="FR">In progress</option>
                  <option value="DE">Hold</option>
                  <option value="DE">Completed</option>
                </select>
              </form>

              {/*----------table-------------*/}
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Employee Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Time(hours)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Ajay
                    </th>
                    <td class="px-6 py-4">7hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Typography>
      </Box>
    </Box>
  );
}
