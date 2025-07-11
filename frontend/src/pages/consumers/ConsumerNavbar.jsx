import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Badge,
    Select,
    MenuItem,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/logo.png';
import styles from './ConsumerNavbar.module.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
const ConsumerNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add your logout logic here
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#164026' }}>
            <Toolbar sx={{ minHeight: '200px' }}>  {/* Default is 64px */}

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 5 }}>
                    <Typography
                        component={Link}
                        to="/consumer"
                        sx={{
                            textDecoration: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 20,
                            fontSize: '1.5rem',
                        }}
                    >
                        <img src={logo} alt="Logo" style={{ height: '100px', width: '100px' }} />
                    </Typography>

                    <Box sx={{ ml: 4, display: 'flex', gap: 4 }} className={styles.navContainer}>
                        <Button
                            component={Link}
                            to="/consumer"
                            startIcon={<HomeIcon className={styles.homeIcon} />}
                            sx={{
                                color: 'white',
                                fontSize: '1.2rem',
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/consumer/products"
                            startIcon={<StorefrontIcon />}
                            sx={{ color: 'white', fontSize: '1.2rem', }}
                        >
                            Products
                        </Button>
                        <Button
                            component={Link}
                            to="/consumer/orders"
                            startIcon={<ReceiptLongIcon />}
                            sx={{
                                color: 'white',
                                fontSize: '1.2rem',
                            }}
                        >
                            Orders
                        </Button>
                        <Button
                            component={Link}
                            to="/consumer/cart"
                            startIcon={
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            }
                            sx={{ color: 'white', fontSize: '1.2rem', }}
                        >
                            Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/consumer/feedback"
                            startIcon={<FeedbackIcon />}
                            sx={{ color: 'white', fontSize: '1.2rem', }}
                        >
                            Feedback
                        </Button>
                        <Button
                            component={Link}
                            to="/consumer/profile"
                            startIcon={<PersonIcon />}
                            sx={{ color: 'white', fontSize: '1.2rem', }}
                        >
                            Profile
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            color: 'white',
                            fontSize: '1.2rem',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ConsumerNavbar;