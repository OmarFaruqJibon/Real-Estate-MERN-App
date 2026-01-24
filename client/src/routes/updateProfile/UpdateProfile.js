import { useContext, useState } from "react";
import "./UpdateProfile.scss";
import { useNavigate } from "react-router-dom";
import apiCall from "./../../lib/apiCall";
import { AuthContext } from "./../../context/AuthContex";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { Alert } from "@mui/material";

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password, phone } = Object.fromEntries(formData);

    try {
      const res = await apiCall.put(`/users/${currentUser.id}`, {
        username,
        email,
        phone,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/dashboard/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h3>Update Profile</h3>
        <p>Manage your personal information and account settings</p>
      </div>

      <div className="profile-card">
        {/* Avatar Section */}
        <div className="avatar-section">
          <img
            src={
              avatar[0] ||
              currentUser?.avatar ||
              "https://i.postimg.cc/J7dgwngh/profile-picture.png"
            }
            alt="avatar"
            className="avatar-img"
          />

          <div className="upload-btn">
            <UploadWidget
              uwConfig={{
                cloudName: "jiboncode",
                uploadPreset: "estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setState={setAvatar}
            />
          </div>

          <h4>{currentUser?.username}</h4>
          <span>{currentUser?.email}</span>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-item">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  defaultValue={currentUser?.username}
                  placeholder="Enter username"
                />
              </div>

              <div className="form-item">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={currentUser?.email}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-item">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  defaultValue={currentUser?.phone || ""}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-item">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <button type="submit" className="save-btn">
              Save Changes
            </button>

            {error && <Alert severity="error">{error}</Alert>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
