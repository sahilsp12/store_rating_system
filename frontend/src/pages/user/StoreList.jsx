import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";
import Loader from "../../components/common/Loader";
import RatingStars from "../../components/common/RatingStars";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchStores();
  }, [page, search, sortBy, order]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await userService.getStores({
        page,
        limit,
        search,
        sortBy,
        order,
      });
      setStores(res.data.stores);
      setTotal(res.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load stores.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container-fluid">
      <h2 className="mb-4">All Stores</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search stores by name, email, or address..."
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
                <option value="name">Store Name</option>
                <option value="email">Store Email</option>
                <option value="address">Address</option>
                <option value="createdAt">Date Created</option>
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
          {stores.length === 0 ? (
            <div className="alert alert-info text-center">No stores found.</div>
          ) : (
            <div className="row">
              {stores.map((store) => (
                <div className="col-md-6 col-lg-4 mb-4" key={store.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{store.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted small">
                        {store.email}
                      </h6>
                      <p className="card-text text-secondary mb-3 flex-grow-1">
                        {store.address}
                      </p>

                      <div className="border-top pt-3 mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="small text-muted">Average Rating</span>
                          <span className="fw-semibold text-warning">
                            ★ {store.averageRating || "0.0"}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="small text-muted">Your Rating</span>
                          {store.userRating !== null ? (
                            <span className="badge bg-success">
                              ★ {store.userRating} / 5
                            </span>
                          ) : (
                            <span className="badge bg-secondary">Not Rated</span>
                          )}
                        </div>

                        <Link
                          to={`/user/stores/${store.id}`}
                          className="btn btn-outline-primary btn-sm w-100"
                        >
                          View Details & Rate
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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

export default StoreList;
