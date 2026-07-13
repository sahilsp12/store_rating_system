import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { user, login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "ADMIN":
        navigate("/admin/dashboard", { replace: true });
        break;

      case "STORE_OWNER":
        navigate("/store-owner/dashboard", {
          replace: true,
        });
        break;

      default:
        navigate("/user/stores", {
          replace: true,
        });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setError("");

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await authService.login(form);

      login(res.data.token, res.data.user);

      switch (res.data.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard", {
            replace: true,
          });
          break;

        case "STORE_OWNER":
          navigate("/store-owner/dashboard", {
            replace: true,
          });
          break;

        default:
          navigate("/user/stores", {
            replace: true,
          });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body p-4">

          <h2 className="text-center mb-4">
            Login
          </h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;