import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentView from './components/Student/StudentView';
import ListingDetails from './components/Student/Listing/ListingDetails';
import WardenView from './components/Warden/WardenView';
import Login from './components/Auth/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/student" element={<StudentView />} />
                <Route path="/student/listing/:id" element={<ListingDetails />} />
                <Route path="/warden/*" element={<WardenView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
