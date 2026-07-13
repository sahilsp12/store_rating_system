import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../../services/admin.service";
import Loader from "../../components/common/Loader";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetchStores();
  }, [page, search, sortBy, order]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await adminService.getStores({
        page,
        limit,
        search,
        sortBy,
        order,
      });
      setStores(res.data.stores);
      setTotal(res.data.total);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch stores."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading && page === 1 && search === "") {
    return <Loader />;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Stores</h2>
        <Link to="/admin/stores/create" className="btn btn-primary">
          Create Store
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by store name, email or address..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Created Date</option>
                <option value="name">Store Name</option>
                <option value="email">Store Email</option>
                <option value="address">Address</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Store Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Owner Name</th>
                  <th>Owner Email</th>
                  <th>Average Rating</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {stores.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No stores found.
                    </td>
                  </tr>
                ) : (
                  stores.map((store, index) => (
                    <tr key={store.id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td className="fw-semibold">{store.name}</td>
                      <td>{store.email}</td>
                      <td>{store.address}</td>
                      <td>{store.owner?.name || "N/A"}</td>
                      <td>{store.owner?.email || "N/A"}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          ★ {store.averageRating || "0.0"}
                        </span>
                      </td>
                      <td>{new Date(store.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      page === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Stores;
