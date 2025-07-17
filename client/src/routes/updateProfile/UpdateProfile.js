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
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="sectionTitle">
        <h3>Update Profile Info</h3>
      </div>
      <div className="profileUpdatePage">
        <div className="avaterContainer">
          <img
            src={
              avatar[0] ||
              currentUser?.avatar ||
              "https://i.postimg.cc/J7dgwngh/profile-picture.png"
            }
            alt=""
            className="avatar"
          />
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

        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={currentUser?.username}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser?.email}
              />
            </div>
            <div className="item">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                defaultValue={currentUser?.phone || ""}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>

            <button type="submit" className="submit-btn">
              Update Info
            </button>

            {error && <Alert severity="error">{error}</Alert>}
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
