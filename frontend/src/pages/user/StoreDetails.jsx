import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../../services/user.service";
import Loader from "../../components/common/Loader";
import RatingStars from "../../components/common/RatingStars";

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStoreDetails();
  }, [id]);

  const fetchStoreDetails = async () => {
    try {
      setLoading(true);
      const res = await userService.getStoreDetails(id);
      setStore(res.data);
      if (res.data.userRating !== null) {
        setSelectedRating(res.data.userRating);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch store details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (selectedRating < 1 || selectedRating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (store.userRating !== null) {
        await userService.updateRating(store.id, selectedRating);
        setSuccess("Rating updated successfully!");
      } else {
        await userService.submitRating({
          storeId: store.id,
          rating: selectedRating,
        });
        setSuccess("Rating submitted successfully!");
      }
      const res = await userService.getStoreDetails(id);
      setStore(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit rating."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error && !store) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">{error}</div>
        <Link to="/user/stores" className="btn btn-secondary">
          Back to Stores
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Store Details</h2>
        <Link to="/user/stores" className="btn btn-secondary">
          Back to Stores
        </Link>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Store Information</h5>
            </div>
            <div className="card-body">
              <h3 className="card-title fw-bold text-primary mb-3">
                {store.name}
              </h3>
              <p className="card-text">
                <strong>Email:</strong> {store.email}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {store.address}
              </p>

              <hr />

              <h5 className="fw-bold mt-4 mb-3">Store Owner Details</h5>
              {store.owner ? (
                <>
                  <p className="card-text">
                    <strong>Owner Name:</strong> {store.owner.name}
                  </p>
                  <p className="card-text">
                    <strong>Owner Email:</strong> {store.owner.email}
                  </p>
                </>
              ) : (
                <p className="text-muted">No owner assigned.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Overall Rating</h5>
            </div>
            <div className="card-body text-center py-4">
              <h1 className="display-4 fw-bold text-warning mb-2">
                ★ {store.averageRating || "0.0"}
              </h1>
              <p className="text-secondary mb-0">Average rating from users</p>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                {store.userRating !== null ? "Update Your Rating" : "Rate This Store"}
              </h5>
            </div>
            <div className="card-body py-4">
              <form onSubmit={handleRatingSubmit} className="text-center">
                <p className="text-secondary mb-3">
                  Click on the stars below to select your rating:
                </p>

                <div className="mb-4 d-flex justify-content-center">
                  <RatingStars
                    rating={selectedRating}
                    editable={true}
                    onChange={(rating) => setSelectedRating(rating)}
                  />
                </div>

                <div className="mb-3">
                  {selectedRating > 0 ? (
                    <span className="fw-semibold text-success">
                      You selected: {selectedRating} Star{selectedRating > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="text-muted">No rating selected</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={submitting || selectedRating === 0}
                >
                  {submitting
                    ? "Submitting..."
                    : store.userRating !== null
                    ? "Update Rating"
                    : "Submit Rating"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
