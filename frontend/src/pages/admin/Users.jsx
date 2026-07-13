import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import adminService from "../../services/admin.service";
import Loader from "../../components/common/Loader";
import SearchBox from "../../components/common/SearchBox";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetchUsers();
  }, [page, search, role, sortBy, order]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await adminService.getUsers({
        page,
        limit,
        search,
        role,
        sortBy,
        order,
      });

      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Users</h2>

        <Link
          to="/admin/users/create"
          className="btn btn-primary"
        >
          Create User
        </Link>

      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-4">

              <input
                type="text"
                className="form-control"
                placeholder="Search..."
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
                value={role}
                onChange={(e) => {
                  setPage(1);
                  setRole(e.target.value);
                }}
              >
                <option value="">All Roles</option>
                <option value="ADMIN">
                  Admin
                </option>
                <option value="USER">
                  User
                </option>
                <option value="STORE_OWNER">
                  Store Owner
                </option>
              </select>

            </div>

            <div className="col-md-3">

              <select
                className="form-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="createdAt">
                  Created Date
                </option>

                <option value="name">
                  Name
                </option>

                <option value="email">
                  Email
                </option>

                <option value="role">
                  Role
                </option>
              </select>

            </div>

            <div className="col-md-2">

              <select
                className="form-select"
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value)
                }
              >
                <option value="asc">
                  Asc
                </option>

                <option value="desc">
                  Desc
                </option>
              </select>

            </div>

          </div>

        </div>

      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Address</th>

              <th>Role</th>

              <th>Created</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    {(page - 1) * limit +
                      index +
                      1}
                  </td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.address}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "ADMIN"
                          ? "bg-danger"
                          : user.role ===
                            "STORE_OWNER"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="btn btn-info btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}

              </tbody>

        </table>

      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">

            <li
              className={`page-item ${
                page === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
              >
                Previous
              </button>
            </li>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    page === index + 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}

            <li
              className={`page-item ${
                page === totalPages
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      )}

    </div>
  );
};

export default Users;