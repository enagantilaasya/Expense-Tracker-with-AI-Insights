import { Navigate } from "react-router";
import { useAuth } from "../stores/authStore";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;