import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/AuthContex";
import apiCall from "../../lib/apiCall";

const AdminUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiCall.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await apiCall.put(`/users/role/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Role change failed");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await apiCall.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="NORMAL">Normal</MenuItem>
                    <MenuItem value="DEVELOPER">Developer</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  {user.id !== currentUser.id && (
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
