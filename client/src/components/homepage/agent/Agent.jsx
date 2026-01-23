import React, { useEffect, useState } from "react";
import "./Agent.scss";
import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import apiCall from "../../../lib/apiCall";
import { Link } from "react-router-dom";

const Agent = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiCall.get("/users?role=DEVELOPER");
      setAgents(res.data);

      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="agent-container">
      <div className="top">
        <span className="lined-title">AGENT</span>
        <h1>Meet Our Agents</h1>
        <p className="section-description">
          Connect with our trusted real estate professionals
        </p>
      </div>

      <div className="agent-cards-grid">
        {agents?.slice(0, 4).map((agent) => (
          <Link
            key={agent.id}
            to={`/profile/${agent.id}`}
            className="agent-card-link"
          >
            <Card className="agent-card-item">
              <div className="agent-image-wrapper">
                <CardMedia
                  component="img"
                  className="agent-image"
                  image={
                    agent?.avatar || "https://i.postimg.cc/zBDzSqBk/team-1.webp"
                  }
                  alt={agent?.username}
                />
              </div>

              <CardContent className="agent-card-content">
                <Typography className="agent-name">
                  {agent?.username}
                </Typography>

                <Typography className="agent-job">
                  {agent?.job || "Sales Executive"}
                </Typography>

                <Box className="agent-badges">
                  <Typography className="agent-type-badge">
                    <VerifiedIcon className="verified-icon" />
                    {agent?.agentTpye?.toUpperCase() || "SUPERAGENT"}
                  </Typography>

                  <Typography className="agent-rating">
                    <StarIcon className="star-icon" />
                    {agent?.rating || "4.5"}
                  </Typography>
                </Box>

                <Typography className="agent-nationality">
                  Nationality: {agent?.country || "Bangladesh"}
                </Typography>

                <Typography className="agent-sales">
                  For Sale:{" "}
                  <span className="sales-count">{agent?.sale || "5"}</span>
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link to={"/agent"} className="see-more-link">
        <button className="see-more-btn">View All Agents</button>
      </Link>
    </div>
  );
};

export default Agent;
