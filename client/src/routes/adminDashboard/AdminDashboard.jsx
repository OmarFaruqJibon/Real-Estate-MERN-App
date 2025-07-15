import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import apiCall from "../../lib/apiCall";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    developers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          apiCall.get("/users"),
          apiCall.get("/posts"),
        ]);

        const allUsers = usersRes.data;
        const allPosts = postsRes.data;

        const developerCount = allUsers.filter(
          (u) => u.role === "DEVELOPER"
        ).length;

        setStats({
          users: allUsers.length,
          properties: allPosts.length,
          developers: developerCount,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className="title">
        <h3>Overview</h3>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd", width: "300px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PeopleIcon /> Total Users
              </Typography>
              <Typography variant="h4">{stats.users}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#fce4ec", width: "300px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <HomeIcon /> Properties
              </Typography>
              <Typography variant="h4">{stats.properties}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9", width: "300px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AdminPanelSettingsIcon /> Developers
              </Typography>
              <Typography variant="h4">{stats.developers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
