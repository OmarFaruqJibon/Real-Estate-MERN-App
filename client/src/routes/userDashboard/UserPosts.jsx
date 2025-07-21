import React, { useContext, useEffect, useState } from "react";
import "./UserLayoutStyle.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import apiCall from "../../lib/apiCall";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/AuthContex";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";

const UserPosts = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCall.get(`/posts/user/${currentUser.id}`);
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

  // const handleUpdate = async (propertyId) => {};

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

  const getColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <div className="title">
        <h3>My Properties</h3>
        <Link to="/addPost">
          <button className="addnew-btn">+ Add New</button>
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="property table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
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
                <TableCell>{formatDate(post.createdAt)}</TableCell>
                <TableCell>
                  <Typography
                    color={getColor(post.status)}
                    sx={{ fontWeight: "bold" }}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/dashboard/edit/${post.id}`}
                    color="success"
                  >
                    <EditNoteIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(post.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPosts;
