import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Box,
    Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebaseConfig.js'; // Adjust the path as needed
import moment from "moment";

const ConsumerProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/consumer/products');
                const data = await res.json();
                console.log(data)
                const updatedProducts = await Promise.all(
                    data.map(async (product) => {
                        if (product.image && !product.image.startsWith('http')) {
                            try {
                                const imageRef = ref(storage, product.image);
                                const url = await getDownloadURL(imageRef);
                                return { ...product, image: url };
                            } catch (err) {
                                console.error("Error fetching image URL:", err);
                                return { ...product, image: null };
                            }
                        }
                        return product;
                    })
                );
                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const res = await axios.post('http://localhost:5000/api/cart/add', {
                consumerId: localStorage.getItem("consumerId"),
                productId,
                quantity: 1,
            });

            if (res.status === 200) {
                alert('Product added to cart!');
            } else {
                alert(res.data.message || 'Failed to add to cart.');
            }
        } catch (error) {
            console.log('Error adding to cart:', error);
            alert('Something went wrong.');
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                    product.image
                                        ? product.image
                                        : 'https://via.placeholder.com/300'
                                }
                                alt={product.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Farmer Name: {product.contact || 'Unknown Farmer'}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#2e7d32', fontWeight: 600, mb: 1 }}
                                >
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Uploaded: {moment(product.updatedAt).fromNow()}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ShoppingCartIcon />}
                                        size="small"
                                        sx={{
                                            borderColor: '#2e7d32',
                                            color: '#2e7d32',
                                            '&:hover': {
                                                borderColor: '#1b5e20',
                                                backgroundColor: 'rgba(46, 125, 50, 0.04)',
                                            },
                                        }}
                                        onClick={() => handleAddToCart(product.productId)}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ConsumerProducts;
