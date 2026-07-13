import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate new password format
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(form.newPassword)) {
      setError(
        "New password must be 8-16 characters and contain at least one uppercase letter and one special character."
      );
      return;
    }

    setSubmitting(true);

    try {
      await authService.changePassword(form);
      setSuccess("Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "" });
      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
              className="btn btn-outline-warning btn-sm me-2"
              onClick={() => setShowModal(true)}
            >
              Change Password
            </button>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                    setSuccess("");
                    setForm({ currentPassword: "", newPassword: "" });
                  }}
                ></button>
              </div>
              <form onSubmit={handlePasswordChange}>
                <div className="modal-body">
                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label text-start d-block">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.currentPassword}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-start d-block">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="8-16 chars, 1 uppercase, 1 special char"
                      value={form.newPassword}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setError("");
                      setSuccess("");
                      setForm({ currentPassword: "", newPassword: "" });
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;