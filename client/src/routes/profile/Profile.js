import React, { useContext } from "react";
import "./profile.scss";
import apiCall from "./../../lib/apiCall";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContex";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiCall.post("/auth/logout");
      updateUser(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    try {
      await apiCall.delete(`/users/${currentUser.id}`);
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Something went wrong while deleting your account.");
    }
  };

  return (
    <div className="profilePage">
      <div className="title">
        <h3>Profile Info</h3>

        <IconButton
          component={Link}
          to="/profile/update"
          color="success"
          sx={{ fontSize: "17px" }}
        >
          <EditNoteIcon />
          Edit
        </IconButton>
      </div>

      <div className="info-container">
        <div className="image">
          <img
            src={
              currentUser.avatar ||
              "https://i.postimg.cc/J7dgwngh/profile-picture.png"
            }
            alt="profile-image"
          />

          <Button
            color="success"
            sx={{ fontSize: "12px" }}
            variant="outlined"
            size="small"
          >
            Upload Image
          </Button>
        </div>

        <TableContainer className="table-data">
          <Table aria-label="property table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                <TableCell>{currentUser?.username.toUpperCase()}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
                <TableCell>{currentUser?.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>Phone</TableCell>
                <TableCell>{currentUser?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="logout">
        <Button
          color="error"
          onClick={handleLogout}
          variant="contained"
          size="small"
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>

        <Button
          onClick={handleDeleteAccount}
          color="error"
          variant="contained"
          size="small"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;
