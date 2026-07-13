import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminService from "../../services/admin.service";
import Loader from "../../components/common/Loader";

const CreateStore = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchStoreOwners();
  }, []);

  const fetchStoreOwners = async () => {
    try {
      setLoadingOwners(true);
      const res = await adminService.getUsers({
        role: "STORE_OWNER",
        limit: 100,
      });
      setOwners(res.data.users);
      if (res.data.users.length > 0) {
        setForm((prev) => ({
          ...prev,
          ownerId: res.data.users[0].id,
        }));
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load store owners."
      );
    } finally {
      setLoadingOwners(false);
    }
  };

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (form.name.trim().length < 3 || form.name.trim().length > 100) {
      return "Store name must be between 3 and 100 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (form.address.trim().length > 400) {
      return "Address cannot exceed 400 characters.";
    }
    if (!form.ownerId) {
      return "Please select a store owner.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const dataToSubmit = {
        ...form,
        ownerId: Number(form.ownerId),
      };
      await adminService.createStore(dataToSubmit);
      setSuccess("Store created successfully!");
      setForm({
        name: "",
        email: "",
        address: "",
        ownerId: owners[0]?.id || "",
      });
      setTimeout(() => {
        navigate("/admin/stores");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create store.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingOwners) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create Store</h2>
        <Link to="/admin/stores" className="btn btn-secondary">
          Back to Stores
        </Link>
      </div>

      <div className="card shadow-sm" style={{ maxWidth: "600px" }}>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {owners.length === 0 ? (
            <div className="alert alert-warning">
              No store owners found. You must{" "}
              <Link to="/admin/users/create">create a Store Owner user</Link> first.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Store Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter store name (3-100 characters)"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Store Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter store email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Store Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="Enter store address (max 400 characters)"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Select Store Owner</label>
                <select
                  name="ownerId"
                  className="form-select"
                  value={form.ownerId}
                  onChange={handleChange}
                  required
                >
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name} ({owner.email})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Store"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
