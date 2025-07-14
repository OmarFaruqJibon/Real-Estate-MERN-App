import React from "react";
import "./UserLayoutStyle.scss";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Person } from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";

const drawerWidth = 270;

const UserLayout = () => {
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
        {/* <Toolbar /> */}

        <List sx={{ color: "white", marginTop: "17px" }}>
          <ListItem button component={Link} to="/dashboard/profile">
            <ListItemIcon>
              <Person sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>

          <ListItem button component={Link} to="/dashboard/posts">
            <ListItemIcon>
              <Home sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="My Listings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "0px", mt: "10px" }}>
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
