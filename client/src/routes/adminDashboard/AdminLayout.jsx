import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, People, BarChart } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import PendingIcon from "@mui/icons-material/Pending";

const drawerWidth = 270;

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: "75px", // space for your global Navbar
          },
        }}
      >
        <List sx={{ color: "white", marginTop: "17px" }}>
          <ListItem button component={Link} to="/admin/overview">
            <ListItemIcon>
              <Dashboard sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon>
              <People sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItem>

          <ListItem button component={Link} to="/admin/properties">
            <ListItemIcon>
              <BarChart sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Properties" />
          </ListItem>

          <ListItem button component={Link} to="/admin/pending">
            <ListItemIcon>
              <PendingIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Pending Properties" />
          </ListItem>

          <ListItem button component={Link} to="/admin/rejected">
            <ListItemIcon>
              <PendingIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Rejected Properties" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "0px", mt: "10px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
