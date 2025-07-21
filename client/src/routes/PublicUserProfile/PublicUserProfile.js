import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bath, BedDouble, Landmark } from "lucide-react";
import { Avatar, Box, Typography, Grid, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChatIcon from "@mui/icons-material/Chat";
import apiCall from "../../lib/apiCall";
import "./PublicUserProfile.scss";
import Footer from "./../../components/footer/Footer";

const PublicUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postRes] = await Promise.all([
          apiCall.get(`/users/${userId}`),
          apiCall.get(`/posts/user/${userId}?status=approved`),
        ]);
        setUser(userRes.data);
        setPosts(postRes.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <>
      <Box className="public-profile-container">
        <Box className="profile-header">
          <Avatar src={user.avatar} className="profile-avatar" />
          <Box>
            <Typography variant="h2" className="username">
              {user.username}
            </Typography>
            <Typography variant="body2" className="email">
              <EmailIcon />
              {user.email}
            </Typography>
            <Typography variant="body2" className="email">
              <PhoneIcon />
              {user.phone}
            </Typography>
          </Box>
        </Box>

        <Box className="contact-bts">
          <Button
            variant="outlined"
            startIcon={<FormatListBulletedIcon />}
            color="success"
          >
            View Properties
          </Button>

          <Button variant="outlined" startIcon={<ChatIcon />} color="secondary">
            Chat Online
          </Button>
        </Box>

        <div className="section-title ">
          <h3>Properties by {user.username}</h3>
        </div>

        <Box className="listing-section">
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {posts.map((post) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={post.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <Link to={`/list/${post.id}`}>
                  <div className="property-card">
                    <img src={post?.images[0]} alt="Property" />

                    <div className="card-body">
                      <h3>{post.title}</h3>

                      <div className="mid">
                        <p>
                          <MapPin color="#000000c7" size={18} />
                          <span>{post?.city}</span>
                        </p>
                        <p className="price">BDT {post?.price}</p>
                      </div>

                      <div className="last">
                        <p>
                          <Landmark color="#000000c7" size={18} />
                          <span>{post?.size} sqft</span>
                        </p>
                        <p>
                          <BedDouble color="#000000c7" size={18} />
                          <span>{post?.bedroom} Bed</span>
                        </p>
                        <p>
                          <Bath color="#000000c7" size={18} />
                          <span>{post?.bathroom} Bath</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default PublicUserProfile;
