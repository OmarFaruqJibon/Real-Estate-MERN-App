import React, { useEffect, useState } from "react";
import "./Agents.scss";
import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
import apiCall from "../../lib/apiCall";
import Footer from "./../../components/footer/Footer";

const Agents = () => {
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
    <>
      <div className="agent-container">
        <div className="top">
          <h1>Our Agents</h1>
        </div>

        <div className="agent-card">
          {agents?.map((agent) => (
            <Link to={`/profile/${agent.id}`}>
              <Card sx={{ display: "flex" }} className="agent-single-card">
                <CardMedia
                  component="img"
                  sx={{ width: 175 }}
                  image={
                    agent?.avatar || "https://i.postimg.cc/zBDzSqBk/team-1.webp"
                  }
                  alt="agents"
                />

                <Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{ fontSize: "20px", fontWeight: "500" }}
                    >
                      {agent?.username}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ color: "text.secondary", fontSize: "13px" }}
                    >
                      {agent?.job || "Sales Executive"}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          backgroundColor: "#3a307f",
                          color: "white",
                          fontSize: "12px",
                          padding: "2px 10px",
                          borderRadius: "7px",
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                        component="div"
                      >
                        <VerifiedIcon sx={{ fontSize: "15px" }} />
                        {agent?.agentTpye?.toUpperCase() || "SUPERAFENT"}
                      </Typography>

                      <Typography
                        component="div"
                        sx={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          fontSize: "15px",
                        }}
                      >
                        <StarIcon sx={{ color: "#ffb92a" }} fontSize="small" />
                        {agent?.rating || "4.5"}
                      </Typography>
                    </Box>

                    <Typography
                      component="div"
                      sx={{ color: "text.secondary", fontSize: "14px" }}
                    >
                      Nationality: {agent?.country || "Bangladesh"}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: "600",
                        color: "#3a307f",
                        marginTop: "40px",
                        fontSize: "15px",
                      }}
                    >
                      For Sale:{" "}
                      <span style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                        {agent?.sale || "5"}
                      </span>
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agents;
