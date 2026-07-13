import { useEffect, useState } from "react";
import storeOwnerService from "../../services/storeOwner.service";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await storeOwnerService.getDashboard();
      setDashboard(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load store owner dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error && !dashboard) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={fetchDashboardData}>
          Retry
        </button>
      </div>
    );
  }

  const { store, averageRating, totalRatings, users } = dashboard;

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Store Owner Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4">
        {/* Store Information */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Store Information</h5>
            </div>
            <div className="card-body">
              <h3 className="card-title fw-bold text-primary mb-3">
                {store.name}
              </h3>
              <p className="card-text mb-2">
                <strong>Email:</strong> {store.email}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {store.address}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Ratings Summary</h5>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
              <div className="row w-100 text-center">
                <div className="col-6 border-end">
                  <h1 className="display-4 fw-bold text-warning mb-1">
                    ★ {averageRating || "0.0"}
                  </h1>
                  <span className="text-secondary small">Average Rating</span>
                </div>
                <div className="col-6">
                  <h1 className="display-4 fw-bold text-info mb-1">
                    {totalRatings}
                  </h1>
                  <span className="text-secondary small">Total Ratings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Who Rated */}
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Users Who Rated Your Store</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Rating Given</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No ratings submitted yet.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          ★ {user.rating} / 5
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
