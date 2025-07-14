import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import apiCall from "../../lib/apiCall";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          apiCall.get("/users"),
          apiCall.get("/posts"),
        ]);
        console.log(properties);
        setUsers(usersRes.data);
        setProperties(postsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprovalToggle = async (postId, currentStatus) => {
    const newStatus = currentStatus === "approved" ? "pending" : "approved";

    if (!window.confirm("Are you sure you want to update post status?")) return;
    try {
      await apiCall.put(`/posts/status/${postId}`, { status: newStatus });
      setProperties((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post status");
    }
  };

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

  const getUserInfo = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.username} (${user.email})` : "Unknown";
  };
  console.log(properties.id);

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await apiCall.delete(`/posts/${propertyId}`);
      setProperties((prev) =>
        prev.filter((property) => property.id !== propertyId)
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Property Management
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="property table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Owner</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {properties.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{getUserInfo(post.userId)}</TableCell>
                <TableCell>{formatDate(post.createdAt)}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      post.status === "approved"
                        ? "success.dark"
                        : "warning.main"
                    }
                    sx={{ fontWeight: "bold" }}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color={post.status === "approved" ? "secondary" : "success"}
                    onClick={() => handleApprovalToggle(post.id, post.status)}
                    sx={{ mr: 2 }}
                  >
                    {post.status === "approved" ? "Unapprove" : "Approve"}
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                  {/* 
                  <IconButton
                    onClick={() => handleDelete(post.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminProperties;
