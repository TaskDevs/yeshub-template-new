import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />; // Allows access to protected pages
};

export default ProtectedRoute;
