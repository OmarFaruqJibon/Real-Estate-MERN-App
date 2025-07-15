import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import apiCall from "../../lib/apiCall";

const PendingProperties = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const res = await apiCall.get("/posts?status=pending");
        setPendingPosts(res.data);
        console.log(pendingPosts);
      } catch (err) {
        console.error("Failed to fetch pending posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPosts();
  }, []);

  console.log(pendingPosts);
  const handleApproval = async (postId) => {
    try {
      await apiCall.put(`/posts/status/${postId}`, { status: "approved" });
      setPendingPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      alert("Approval failed");
    }
  };

  const handleRejection = async (postId) => {
    if (!window.confirm("Are you sure you want to reject this post?")) return;

    try {
      await apiCall.put(`/posts/status/${postId}`, { status: "rejected" }); // REGECT POST AND STAY IN DB WITH STATUS REJECTED
      // await apiCall.delete(`/posts/${postId}`); // PERMANENTLY DELETE POST FROM DB
      setPendingPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Rejection failed");
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <div className="title">
        <h3>Pending Property Approvals</h3>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.userId}</TableCell>
                <TableCell>{formatDate(post.createdAt)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleApproval(post.id)}
                    sx={{ mr: 2 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRejection(post.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingProperties;
