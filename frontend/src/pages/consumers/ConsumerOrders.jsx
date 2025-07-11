import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Paper, Stepper, Step,
    StepLabel, Box, Grid, Chip, CircularProgress, Button
} from '@mui/material';

const ConsumerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const consumerId = localStorage.getItem("consumerId");

    // Fetch Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/${consumerId}`);
                setOrders(res.data);
                console.log(res.data)
            } catch (err) {
                console.error("Error fetching orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Cancel Order
    const handleCancel = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/cancel/${orderId}`);
            setOrders(prev =>
                prev.map(o =>
                    o.orderId === orderId ? { ...o, orderStatus: 'Cancelled' } : o
                )
            );
        } catch (err) {
            console.error('Failed to cancel order:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'success';
            case 'Shipped': return 'info';
            case 'Confirmed': return 'warning';
            case 'Cancelled': return 'error';
            case 'Ordered': return 'default';
            default: return 'default';
        }
    };

    const statusSteps = ['Ordered', 'Confirmed', 'Shipped', 'Delivered'];

    const getCurrentStep = (status) => {
        return statusSteps.indexOf(status);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                orders.map((order) => (
                    <Paper key={order._id} sx={{ p: 3, mb: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">Order #{order.orderId}</Typography>
                                <Typography color="text.secondary">
                                    Placed on {new Date(order.orderDate).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                                <Chip
                                    label={order.orderStatus}
                                    color={getStatusColor(order.orderStatus)}
                                    sx={{ mb: 1 }}
                                />
                                <Typography variant="h6" color="primary">
                                    Total: ₹{order.amount - 150}
                                </Typography>
                                {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleCancel(order.orderId)}
                                        sx={{ mt: 1 }}
                                    >
                                        Cancel Order
                                    </Button>
                                )}
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Products:
                            </Typography>
                            {order.products?.map((item, index) => (
                                <Box key={index} sx={{ mb: 1, pl: 2 }}>
                                    <Typography>
                                        {item.name} - ₹{item.price} × {item.quantity}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Stepper activeStep={getCurrentStep(order.orderStatus)} alternativeLabel>
                                {statusSteps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default ConsumerOrders;
