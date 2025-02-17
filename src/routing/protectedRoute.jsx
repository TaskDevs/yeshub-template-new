import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("authToken");

    console.log("ProtectedRoute Token:", token); // Debugging

    if (!token) {
        console.log("No token found! Redirecting to login...");
        return <Navigate to="/login" replace />;
    }

    console.log("User is authenticated. Granting access...");
    return <Outlet />; // Allows access to protected pages
};

export default ProtectedRoute;
