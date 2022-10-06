import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import TestPage from '../Test';

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestPage />} />
    </Routes>
)