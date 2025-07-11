import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConsumerNavbar from './ConsumerNavbar';
import ConsumerHome from './ConsumerHome';
import ConsumerProducts from './ConsumerProducts';
import ConsumerCart from './ConsumerCart';
import ConsumerProfile from './ConsumerProfile';
import ConsumerOrders from './ConsumerOrders';
import ConsumerFeedback from './ConsumerFeedback';

const ConsumerDashboard = () => {
    return (
        <div>
            <ConsumerNavbar />
            <Routes>
                <Route path="/" element={<ConsumerHome />} />
                <Route path="/products" element={<ConsumerProducts />} />
                <Route path="/cart" element={<ConsumerCart />} />
                <Route path="/profile" element={<ConsumerProfile />} />
                <Route path="/orders" element={<ConsumerOrders />} />
                <Route path="/feedback" element={<ConsumerFeedback />} />
            </Routes>
        </div>
    );
};

export default ConsumerDashboard;