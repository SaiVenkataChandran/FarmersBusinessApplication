import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ConsumerHome.module.css';

const ConsumerHome = () => {
    const features = [
        {
            title: 'Fresh Products',
            description: 'Direct from local farmers to your table',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
        },
        {
            title: 'Support Local',
            description: 'Help local farmers grow their business',
            image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
        },
        {
            title: 'Quality Assured',
            description: 'All products are quality checked',
            image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80',
        },
    ];

    return (
        <div>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <Typography variant="h1" className={styles.heroTitle}>
                        Welcome to AGRIBRIDGE
                    </Typography>
                    <Typography variant="h5" className={styles.heroSubtitle}>
                        Fresh, Local, and Sustainable Products Direct from Farmers
                    </Typography>
                    <Button
                        component={Link}
                        to="/consumer/products"
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.ctaButton}
                    >
                        Shop Now
                    </Button>
                </div>
            </div>

            <section className={styles.featureSection}>
                <Container>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <div className={styles.featureCard}>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className={styles.featureImage}
                                    />
                                    <Typography variant="h5" className={styles.featureTitle}>
                                        {feature.title}
                                    </Typography>
                                    <Typography className={styles.featureDescription}>
                                        {feature.description}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            <section className={styles.ctaSection}>
                <Container>
                    <Typography variant="h3" gutterBottom>
                        Ready to Start Shopping?
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
                        Browse our selection of fresh, local products
                    </Typography>
                    <Button
                        component={Link}
                        to="/consumer/products"
                        variant="contained"
                        color="primary"
                        size="large"
                        className={styles.ctaButton}
                    >
                        View Products
                    </Button>
                </Container>
            </section>
        </div>
    );
};

export default ConsumerHome;