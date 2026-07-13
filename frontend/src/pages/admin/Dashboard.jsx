import { useEffect, useState } from "react";

import adminService from "../../services/admin.service";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await adminService.getDashboard();

      setDashboard(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="card border-primary shadow-sm">

            <div className="card-body text-center">

              <h5>Total Users</h5>

              <h2 className="text-primary">
                {dashboard.totalUsers}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card border-success shadow-sm">

            <div className="card-body text-center">

              <h5>Total Stores</h5>

              <h2 className="text-success">
                {dashboard.totalStores}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card border-warning shadow-sm">

            <div className="card-body text-center">

              <h5>Total Ratings</h5>

              <h2 className="text-warning">
                {dashboard.totalRatings}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;