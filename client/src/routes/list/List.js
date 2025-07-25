import React, { Suspense, useState } from "react";
import "./list.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { MapPin, Sliders } from "lucide-react";
import Footer from "../../components/footer/Footer";
import { Drawer, IconButton, Box, Typography } from "@mui/material";

const List = () => {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="listPage">
        <div className="upperPart">
          {/* City Location */}
          <div className="cityLocation">
            <span>
              <MapPin color="#09aa57" size={19} style={{ marginTop: "3px" }} />
            </span>
            <span>{city || "Search Location"}</span>
          </div>

          {/* MUI IconButton for Filter */}
          <div className="mobileFilterIcon">
            <IconButton
              onClick={() => setIsDrawerOpen(true)}
              sx={{
                borderRadius: "6px",
                backgroundColor: "#3a307f",
                "&:hover": { backgroundColor: "#3a307f" },
                color: "white",
              }}
            >
              <Sliders size={18} />
            </IconButton>
          </div>
        </div>

        <div className="listPageWrapper">
          <div className="filterContainer">
            <Filter />
          </div>

          <div className="listContainer">
            <div className="wrapper">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data?.postResponse}
                  errorElement={<p>Error loading Properties!</p>}
                >
                  {(postResponse) =>
                    postResponse?.data.map((post) => (
                      <Card key={post.id} item={post} />
                    ))
                  }
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* MUI Drawer for mobile filters */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{
          sx: {
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        PaperProps={{
          sx: { width: "80%", padding: 2 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: "14px", color: "black", fontWeight: "600" }}
          >
            Filters
          </Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)}>✕</IconButton>
        </Box>
        <Filter onClose={() => setTimeout(() => setIsDrawerOpen(false), 250)} />
      </Drawer>

      <Footer />
    </>
  );
};

export default List;
