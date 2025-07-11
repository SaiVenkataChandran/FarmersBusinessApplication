import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Avatar,
    TextField,
    Tabs,
    Tab,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    marginBottom: theme.spacing(2),
}));

const ConsumerProfile = () => {
    const [tabValue, setTabValue] = useState(0);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const consumerId = localStorage.getItem("consumerId");

    const orders = [
        {
            orderId: "ORD12345",
            product: "Fresh Tomatoes",
            quantity: 3,
            price: 150,
            date: "2025-04-10T12:34:56Z",
            paymentMethod: "UPI",
        },
        {
            orderId: "ORD12346",
            product: "Organic Spinach",
            quantity: 2,
            price: 100,
            date: "2025-04-08T10:20:00Z",
            paymentMethod: "Cash on Delivery",
        },
        {
            orderId: "ORD12347",
            product: "Carrots",
            quantity: 5,
            price: 200,
            date: "2025-04-05T09:15:30Z",
            paymentMethod: "Card",
        },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/consumer-profile/${consumerId}`);
                if (res.data.success) {
                    setProfile(res.data.data);
                } else {
                    alert("Failed to fetch profile details.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert("An error occurred while fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: "center" }}>
                <CircularProgress />
                <Typography mt={2}>Loading profile...</Typography>
            </Container>
        );
    }

    if (!profile) {
        return (
            <Container sx={{ py: 4, textAlign: "center" }}>
                <Typography color="error">Profile data not available.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                        <ProfileAvatar src={profile.profileImage || "/images/default-avatar.png"} />
                        <Typography variant="h5" gutterBottom>
                            {profile.fullName}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            {profile.email}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: { xs: 2, md: 3 } }}>
                        <Tabs
                            value={tabValue}
                            onChange={(e, newValue) => setTabValue(newValue)}
                            variant="fullWidth"
                            sx={{ mb: 3 }}
                        >
                            <Tab label="Profile Details" />
                            <Tab label="Order History" />
                        </Tabs>

                        {tabValue === 0 && (
                            <Box sx={{ px: { xs: 1, sm: 2 } }}>
                                <Typography variant="h6" gutterBottom>
                                    Personal Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={profile.fullName}
                                            disabled
                                            InputProps={{
                                                style: { color: 'rgba(0, 0, 0, 0.87)' },
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={profile.email}
                                            disabled
                                            InputProps={{
                                                style: { color: 'rgba(0, 0, 0, 0.87)' },
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            value={profile.phone}
                                            disabled
                                            InputProps={{
                                                style: { color: 'rgba(0, 0, 0, 0.87)' },
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            multiline
                                            rows={3}
                                            value={profile.address}
                                            disabled
                                            InputProps={{
                                                style: { color: 'rgba(0, 0, 0, 0.87)' },
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {tabValue === 1 && (
                            <Box sx={{ px: { xs: 1, sm: 2 } }}>
                                <Typography variant="h6" gutterBottom>
                                    Recent Orders
                                </Typography>
                                {orders.length === 0 ? (
                                    <Typography>No orders found.</Typography>
                                ) : (
                                    <Grid container spacing={2}>
                                        {orders.map((order, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Paper elevation={2} sx={{ p: 2 }}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography><strong>Order ID:</strong> {order.orderId}</Typography>
                                                            <Typography><strong>Product:</strong> {order.product}</Typography>
                                                            <Typography><strong>Quantity:</strong> {order.quantity}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography><strong>Price:</strong> ₹{order.price}</Typography>
                                                            <Typography><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</Typography>
                                                            <Typography><strong>Payment:</strong> {order.paymentMethod}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConsumerProfile;
