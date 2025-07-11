import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Divider,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ConsumerCart = () => {
    const consumerId = localStorage.getItem("consumerId");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/${consumerId}`);
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        if (consumerId) {
            fetchCartItems();
        }
    }, [consumerId]);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await axios.patch(`http://localhost:5000/api/cart/${consumerId}/${productId}`, {
                quantity: newQuantity,
            });

            setCartItems(prev =>
                prev.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.log("Error updating quantity:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${consumerId}/${productId}`);
            setCartItems(prev => prev.filter(item => item.productId !== productId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePayment = async () => {
        const amount = calculateTotal() + 150;

        try {
            const { data } = await axios.post("http://localhost:5000/api/payment/order", {
                amount,
                consumerId,
            });

            const options = {
                key: 'rzp_test_mpnS7HhRWwVKu6',
                amount: amount * 100,
                currency: "INR",
                name: "AgroKart",
                description: "Purchase from AgroKart",
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            consumerId,
                            cartItems,
                            amount
                        });

                        if (verifyRes.data.success === true) {
                            const orderRes = await axios.post("http://localhost:5000/api/addOrder", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                consumerId,
                                cartItems,
                                amount,
                                Payment_type: "Online"
                            });

                            if (orderRes.data.message === "Order placed successfully") {
                                alert("Payment successful and order placed!");
                            } else {
                                alert("Payment done, but order failed.");
                            }
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (err) {
                        console.log("Payment verification or order placement failed:", err);
                        alert("Something went wrong while processing payment.");
                    }
                },
                theme: {
                    color: "#1976d2"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.log("Error in payment:", err);
            alert("Failed to initiate payment.");
        }
    };

    if (loading) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Loading Cart...
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {cartItems.length === 0 ? (
                        <Typography>No items in cart.</Typography>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item.productId} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={3}>
                                            <img
                                                src={item.image || "https://via.placeholder.com/120"}
                                                alt={item.name}
                                                style={{
                                                    width: '100%',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography color="text.secondary">
                                                ₹{item.price} each
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ mx: 2 }}>{Number(item.quantity)}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton color="error" onClick={() => handleDelete(item.productId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Grid>

                {cartItems.length > 0 && (
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography>Subtotal:</Typography>
                                <Typography>₹{calculateTotal().toFixed(2)}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography>Shipping:</Typography>
                                <Typography>₹150.00</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">
                                    ₹{(calculateTotal() + 150).toFixed(2)}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={handlePayment}
                            >
                                Buy now
                            </Button>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ConsumerCart;
