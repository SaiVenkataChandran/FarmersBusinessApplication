import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Rating,
    Box,
    Paper,
    Alert,
    Snackbar,
} from '@mui/material';

const ConsumerFeedback = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle feedback submission here
        setSuccess(true);
        setRating(0);
        setFeedback('');
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Your Feedback Matters
                </Typography>
                <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Help us improve our service by sharing your experience
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography component="legend">Overall Rating</Typography>
                        <Rating
                            size="large"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Submit Feedback
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Thank you for your feedback!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ConsumerFeedback;