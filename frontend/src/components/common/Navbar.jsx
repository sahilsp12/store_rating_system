import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          Store Rating System
        </span>

        <div className="d-flex align-items-center">

          <span className="badge bg-primary me-3">
            {user?.role}
          </span>

          <span className="text-white me-3">
            Welcome, {user?.name}
          </span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;