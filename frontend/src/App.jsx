import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/LogIn/Login";
import Dashboard from "./components/User/Dashboard/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPass from "./components/Auth/ForgotPass/ForgotPass";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import DetailedPost from "./components/User/Dashboard/DetailedPost";

const App = () => {
    // Below code checks if the backend is ready before rendering the app.
    // const checkBackend = async () => {
    //     try {
    //         await fetch("https://loacalhost:3000");
    //     } catch (err) {
    //         console.log("Backend is not ready yet");
    //         setTimeout(checkBackend, 1000);
    //     }
    // };
    return (
        <Routes>
            <Route path="/" element={<MarketPlace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/question/:id" element={ <DetailedPost /> } />
            <Route
                path="/market-place"
                element={
                    // <PrivateRoute>
                        <MarketPlace />
                    /* </PrivateRoute> */
                }
            />
            <Route
                path="/dashboard"
                element={
                    // <PrivateRoute>
                        <Dashboard />
                    /* </PrivateRoute> */
                }
            />
        </Routes>
    );
};

export default App;
