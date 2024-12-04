const [employeeOpen, setEmployeeOpen] = useState(false); // State for Employee dropdown

const handleEmployeeToggle = () => {
    setEmployeeOpen((prev) => !prev); // Toggle dropdown
  };


  {/* Employee Section with Dropdown */}
  <ListItem disablePadding sx={{ display: "block" }}>
  <ListItemButton
    sx={{
      minHeight: 48,
      px: 2.5,
      justifyContent: open ? "initial" : "center",
    }}
    onClick={handleEmployeeToggle} // Toggle dropdown
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        justifyContent: "center",
        mr: open ? 3 : "auto",
      }}
    >
      <BadgeIcon />
    </ListItemIcon>
    <ListItemText
      primary="Employee"
      sx={{ opacity: open ? 1 : 0 }}
    />
    {employeeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
  </ListItemButton>
  <Collapse in={employeeOpen} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItemButton
        sx={{
          pl: 4,
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemText
          primary="Employee Details"
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          pl: 4,
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemText
          primary="Employee Reports"
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          pl: 4,
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemText
          primary="Employee Attendance"
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </List>
  </Collapse>
</ListItem>