import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Dashboard, People, BarChart, Home } from "@mui/icons-material";
import PendingIcon from "@mui/icons-material/Pending";
import "./AdminDashboard.scss";

const fullDrawerWidth = 250;
const collapsedDrawerWidth = 72;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // for desktop sidebar text toggle

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const drawerWidth = isMobile
    ? fullDrawerWidth
    : collapsed
    ? collapsedDrawerWidth
    : fullDrawerWidth;

  const drawer = (
    <List sx={{ color: "white", marginTop: "17px" }}>
      {[
        { label: "Home", icon: <Home sx={{ color: "white" }} />, to: "/" },
        {
          label: "Overview",
          icon: <Dashboard sx={{ color: "white" }} />,
          to: "/admin/overview",
        },
        {
          label: "Manage Users",
          icon: <People sx={{ color: "white" }} />,
          to: "/admin/users",
        },
        {
          label: "Manage Properties",
          icon: <BarChart sx={{ color: "white" }} />,
          to: "/admin/properties",
        },
        {
          label: "Pending Properties",
          icon: <PendingIcon sx={{ color: "white" }} />,
          to: "/admin/pending",
        },
        {
          label: "Rejected Properties",
          icon: <PendingIcon sx={{ color: "white" }} />,
          to: "/admin/rejected",
        },
      ].map(({ label, icon, to }) => (
        <Tooltip
          key={label}
          title={collapsed && !isMobile ? label : ""}
          placement="right"
        >
          <ListItem button component={Link} to={to}>
            <ListItemIcon sx={{ minWidth: 40, mb: 2 }}>{icon}</ListItemIcon>
            {(!collapsed || isMobile) && (
              <ListItemText sx={{ minWidth: 40, mb: 2 }} primary={label} />
            )}
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar always shown */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#121621",
          minHeight: "75px",
        }}
      >
        <Toolbar sx={{ minHeight: "75px !important" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: isMobile ? "64px" : "75px",
            backgroundColor: "#1d1d1dff",
            color: "white",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
