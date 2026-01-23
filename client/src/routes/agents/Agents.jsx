import React, { useEffect, useState } from "react";
import "./Agents.scss";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import apiCall from "../../lib/apiCall";
import Footer from "./../../components/footer/Footer";

const Agents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCall.get("/users?role=DEVELOPER");
        setAgents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="agents-page">
        {/* HERO */}
        <div className="agents-hero">
          <Container maxWidth="lg">
            <h1>Meet Our Professional Agents</h1>
            <p>
              {agents.length} verified real estate experts ready to help you
            </p>
          </Container>
        </div>

        {/* Agents Grid Section */}
        <Container maxWidth="xl" className="agents-container">
          <div className="agents-grid-section">
            <Grid container spacing={3} className="agents-grid">
              {agents?.map((agent) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  key={agent.id}
                  className="grid-item"
                >
                  <Link to={`/profile/${agent.id}`} className="agent-card-link">
                    <Card className="agent-card-item">
                      <div className="agent-image-wrapper">
                        <div className="image-container">
                          <CardMedia
                            component="img"
                            className="agent-image"
                            image={
                              agent?.avatar ||
                              "https://i.postimg.cc/zBDzSqBk/team-1.webp"
                            }
                            alt={agent?.username}
                          />
                        </div>
                        <div className="agent-status-badge">
                          <VerifiedIcon className="verified-icon" />
                          <span>
                            {agent?.agentTpye?.toUpperCase() || "SUPER AGENT"}
                          </span>
                        </div>
                      </div>

                      {/* Agent Info */}
                      <CardContent className="agent-info">
                        <Typography className="agent-name">
                          {agent?.username}
                        </Typography>
                        <Typography className="agent-title">
                          {agent?.job || "Real Estate Agent"}
                        </Typography>

                        {/* Rating */}
                        <Box className="rating-box">
                          <Box className="stars">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`star ${i < Math.floor(agent?.rating || 4.5) ? "filled" : ""}`}
                              />
                            ))}
                          </Box>
                          <Typography className="rating-text">
                            {agent?.rating || "4.5"} Rating
                          </Typography>
                        </Box>

                        {/* Agent Details */}
                        <div className="agent-details">
                          <div className="detail-item">
                            <LocationOnIcon className="detail-icon" />
                            <Typography className="detail-text">
                              {agent?.country || "Bangladesh"}
                            </Typography>
                          </div>
                          <div className="detail-item">
                            <EmailIcon className="detail-icon" />
                            <Typography className="detail-text">
                              {agent?.email || "contact@email.com"}
                            </Typography>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="agent-stats">
                          <div className="stat-item">
                            <Typography className="stat-number">
                              {agent?.sale || "5"}
                            </Typography>
                            <Typography className="stat-label">
                              Properties
                            </Typography>
                          </div>
                          <div className="stat-divider"></div>
                          <div className="stat-item">
                            <Typography className="stat-number">
                              {agent?.experience || "3+"}
                            </Typography>
                            <Typography className="stat-label">
                              Years Exp.
                            </Typography>
                          </div>
                          <div className="stat-divider"></div>
                          <div className="stat-item">
                            <Typography className="stat-number">
                              {agent?.clients || "50+"}
                            </Typography>
                            <Typography className="stat-label">
                              Clients
                            </Typography>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button className="contact-btn">
                          <PhoneIcon className="btn-icon" />
                          Contact Agent
                        </button>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>

        {/* CTA Section */}
        <div className="cta-section">
          <Container maxWidth="md">
            <div className="cta-content">
              <h2 className="cta-title">Looking for the Perfect Agent?</h2>
              <p className="cta-description">
                Our team is here to guide you through every step of your real
                estate journey with expertise and dedication.
              </p>
              <Link to="/contact">
                <button className="cta-button">Schedule a Consultation</button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agents;
