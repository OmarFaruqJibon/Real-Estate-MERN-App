import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Avatar, Box, Typography, Grid, Card, CardContent, Chip
} from "@mui/material";
import apiCall from "../../lib/apiCall";

const PublicUserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    console.log(userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, postRes] = await Promise.all([
                    apiCall.get(`/users/${userId}`),
                    apiCall.get(`/posts/user/${userId}`),
                ]);
                setUser(userRes.data);
                setPosts(postRes.data);
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        fetchData();
    }, [userId]);

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "success";
            case "pending":
                return "warning";
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Box p={3}>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
                <Avatar src={user.avatar} sx={{ width: 64, height: 64 }} />
                <Box>
                    <Typography variant="h6">{user.username}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom>
                {user.username}'s Listings
            </Typography>

            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.city}
                                </Typography>
                                <Chip
                                    label={post.status}
                                    color={getStatusColor(post.status)}
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                                <Typography variant="body2" mt={1}>
                                    Posted: {new Date(post.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PublicUserProfile;
