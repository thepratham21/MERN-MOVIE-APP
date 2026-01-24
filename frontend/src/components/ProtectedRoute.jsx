import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, adminOnly }) => {
    const { token, role } = useSelector((state) => state.auth);

    if (!token) return <Navigate to="/login" />;

    if (adminOnly && role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
