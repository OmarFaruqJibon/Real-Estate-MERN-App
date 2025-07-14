import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Person } from "@mui/icons-material";
import { Outlet, Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; max-age=0";
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: "75px", // if there's a global navbar
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboard/profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>

          <ListItem button component={Link} to="/dashboard/posts">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="My Listings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "0px", mt: "10px" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
