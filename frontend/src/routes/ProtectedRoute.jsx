import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
  roles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    roles &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;