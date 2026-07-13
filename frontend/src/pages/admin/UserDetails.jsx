import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import adminService from "../../services/admin.service";
import Loader from "../../components/common/Loader";

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const res = await adminService.getUserById(id);

      setUser(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch user details."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-warning">
        User not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>User Details</h2>

        <Link
          to="/admin/users"
          className="btn btn-secondary"
        >
          Back
        </Link>

      </div>

      <div className="card shadow-sm mb-4">

        <div className="card-header bg-primary text-white">
          User Information
        </div>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-6">
              <strong>Name</strong>
              <p>{user.name}</p>
            </div>

            <div className="col-md-6">
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>

          </div>

          <div className="row mb-3">

            <div className="col-md-6">
              <strong>Role</strong>
              <p>{user.role}</p>
            </div>

            <div className="col-md-6">
              <strong>Created</strong>
              <p>
                {new Date(
                  user.createdAt
                ).toLocaleString()}
              </p>
            </div>

          </div>

          <div className="mb-3">
            <strong>Address</strong>
            <p>{user.address}</p>
          </div>

        </div>

      </div>

      {user.store && (
        <div className="card shadow-sm">

          <div className="card-header bg-success text-white">
            Store Information
          </div>

          <div className="card-body">

            <div className="row mb-3">

              <div className="col-md-6">
                <strong>Store Name</strong>
                <p>{user.store.name}</p>
              </div>

              <div className="col-md-6">
                <strong>Email</strong>
                <p>{user.store.email}</p>
              </div>

            </div>

            <div className="row mb-3">

              <div className="col-md-6">
                <strong>Average Rating</strong>
                <p>
                  ⭐ {user.store.averageRating}
                </p>
              </div>

              <div className="col-md-6">
                <strong>Address</strong>
                <p>{user.store.address}</p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default UserDetails;