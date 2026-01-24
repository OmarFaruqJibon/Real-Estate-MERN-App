// client\src\routes\list\List.js
import React, { Suspense, useState, useEffect, useMemo } from "react";
import "./list.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import {
  Await,
  useLoaderData,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { MapPin, Sliders, Grid, List as ListIcon } from "lucide-react";
import Footer from "../../components/footer/Footer";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from "@mui/material";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const List = () => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const city = searchParams.get("city") || "";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "newest";

    setCurrentPage(page);
    setItemsPerPage(limit);
    setSortBy(sort);
  }, [searchParams]);

  useEffect(() => {
    if (data?.postResponse?.data) {
      setFilteredPosts(data.postResponse.data);
    }
  }, [data]);

  const sortedPosts = useMemo(() => {
    if (!filteredPosts.length) return [];

    return [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "size_desc":
          return b.size - a.size;
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [filteredPosts, sortBy]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedPosts.length / itemsPerPage);
  }, [sortedPosts, itemsPerPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", value);
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (event) => {
    const newLimit = event.target.value;
    setItemsPerPage(newLimit);
    setCurrentPage(1);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("limit", newLimit);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSortBy(newSort);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", newSort);
    setSearchParams(newSearchParams);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  return (
    <>
      <div className="listPage">
        {/* Header Section */}
        <div className="listHeader">
          <div className="headerTop">
            <div className="locationInfo">
              <div className="cityLocation">
                <MapPin color="#09aa57" size={20} />
                <Typography variant="h6" component="h1">
                  Properties in {city || "All Locations"}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                className="resultsCount"
              >
                {filteredPosts.length} properties found
              </Typography>
            </div>

            <div className="mobileFilterIcon">
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                className="filterButton"
                size="medium"
              >
                <Sliders size={20} />
                <span>Filters</span>
              </IconButton>
            </div>
          </div>

          {/* Controls Section */}
          <div className="listControls">
            <div className="viewControls">
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
              >
                <ToggleButton value="list">
                  <ListIcon size={18} />
                </ToggleButton>
                <ToggleButton value="grid">
                  <Grid size={18} />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className="sortControls">
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort by"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    <MenuItem value="size_desc">Largest First</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>Show</InputLabel>
                  <Select
                    value={itemsPerPage}
                    label="Show"
                    onChange={handleItemsPerPageChange}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="listPageWrapper">
          {/* Desktop Filter */}
          <div className="filterContainer">
            <Filter onFilterChange={setFilteredPosts} />
          </div>

          {/* Property Listings */}
          <div className="listContainer">
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Await
                resolve={data?.postResponse}
                errorElement={
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Error loading properties. Please try again.
                  </Alert>
                }
              >
                {(postResponse) => {
                  return (
                    <>
                      <div className={`propertiesWrapper ${viewMode}`}>
                        {paginatedPosts.length > 0 ? (
                          paginatedPosts.map((post) => (
                            <Card
                              key={post.id}
                              item={post}
                              viewMode={viewMode}
                            />
                          ))
                        ) : (
                          <Box className="noResults">
                            <Typography variant="h6" color="text.secondary">
                              No properties found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your filters
                            </Typography>
                          </Box>
                        )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <Box className="paginationContainer">
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                            boundaryCount={1}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="pageInfo"
                          >
                            Page {currentPage} of {totalPages} • Showing{" "}
                            {paginatedPosts.length} of {filteredPosts.length}{" "}
                            properties
                          </Typography>
                        </Box>
                      )}
                    </>
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>

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
          sx: {
            width: { xs: "100%", sm: "400px" },
            maxWidth: "90vw",
            padding: 2,
          },
        }}
      >
        <Box className="drawerHeader">
          <Typography variant="h6" fontWeight="600">
            Filters
          </Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)} size="small">
            ✕
          </IconButton>
        </Box>
        <Box className="drawerContent">
          <Filter
            onFilterChange={setFilteredPosts}
            onClose={() => setTimeout(() => setIsDrawerOpen(false), 250)}
          />
        </Box>
      </Drawer>

      <Footer />
    </>
  );
};

export default List;
