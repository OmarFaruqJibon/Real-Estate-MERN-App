import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bath, BedDouble, Landmark, Star } from "lucide-react";
import {
  Avatar,
  Typography,
  Grid,
  Button,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatIcon from "@mui/icons-material/Chat";
import apiCall from "../../lib/apiCall";
import "./PublicUserProfile.scss";
import Footer from "../../components/footer/Footer";

const PublicUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(0);

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
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <>
      <div className="agent-pro-page">
        {/* HERO */}
        <div className="agent-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>{user.username}</h1>
            <p>Premium Real Estate Consultant</p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="agent-glass-card">
          <Avatar src={user.avatar} className="agent-avatar" />

          <div className="agent-main-info">
            <h2>{user.username}</h2>

            <div className="badges">
              <Chip icon={<VerifiedIcon />} label="Verified Agent" />
              <span className="rating">
                <Star size={16} /> 4.8 (120 reviews)
              </span>
            </div>

            <p className="agent-role">
              {user.job || "Senior Real Estate Consultant"}
            </p>

            <div className="agent-meta">
              <span>
                <EmailIcon /> {user.email}
              </span>
              <span>
                <PhoneIcon /> {user.phone || "Not available"}
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="agent-actions">
            <Button variant="contained" color="success">
              Contact Agent
            </Button>
            {/* <Button variant="outlined" startIcon={<ChatIcon />}>
              Chat
            </Button> */}
          </div>
        </div>

        {/* STATS */}
        <div className="agent-stats-bar">
          <div>
            <strong>{posts.length}</strong>
            <span> Active Listings</span>
          </div>
          <div>
            <strong>{user.experience || "5+"}</strong>
            <span> Years Experience</span>
          </div>
          <div>
            <strong>{user.clients || "120+"}</strong>
            <span> Happy Clients</span>
          </div>
          <div>
            <strong>{user.sales || "300+"}</strong>
            <span> Properties Sold</span>
          </div>
        </div>

        {/* TABS */}
        <div className="agent-tabs">
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Properties" />
            <Tab label="About Agent" />
            <Tab label="Reviews" />
          </Tabs>
        </div>

        {/* TAB CONTENT */}
        <div className="agent-tab-content">
          {tab === 0 && (
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={post.id}>
                  <Link to={`/list/${post.id}`} className="lux-property-link">
                    <div className="lux-property-card">
                      <div className="lux-image">
                        <img src={post?.images[0]} alt="Property" />
                        <div className="price">BDT {post?.price}</div>
                      </div>

                      <div className="lux-body">
                        <h3>{post.title}</h3>

                        <div className="location">
                          <MapPin size={16} />
                          <span>{post?.city}</span>
                        </div>

                        <div className="features">
                          <span>
                            <Landmark size={16} /> {post?.size} sqft
                          </span>
                          <span>
                            <BedDouble size={16} /> {post?.bedroom} Bed
                          </span>
                          <span>
                            <Bath size={16} /> {post?.bathroom} Bath
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}

          {tab === 1 && (
            <div className="about-agent">
              <h3>About {user.username}</h3>
              <p>
                {user.bio ||
                  "Experienced real estate agent specializing in residential and commercial properties. Known for delivering exceptional client service and market expertise."}
              </p>
            </div>
          )}

          {tab === 2 && (
            <div className="reviews-box">
              <p>⭐ Reviews feature coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PublicUserProfile;
