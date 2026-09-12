import {
  Plus,
  Star,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Search,
  MessageSquareQuote,
} from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  role: "",
  rating: 5,
  comment: "",
  image: "",
  isVisible: true,
};

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // ==================== FETCH REVIEWS ====================

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/reviews"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch reviews"
        );
      }

      setReviews(data.data || data);
    } catch (error) {
      console.error("Fetch reviews error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ==================== OPEN ADD MODAL ====================

  const openAddModal = () => {
    setEditingReview(null);
    setForm(initialForm);
    setError("");
    setShowModal(true);
  };

  // ==================== OPEN EDIT MODAL ====================

  const openEditModal = (review) => {
    setEditingReview(review);

    setForm({
      name: review.name || "",
      role: review.role || "",
      rating: review.rating ?? 5,
      comment: review.comment || "",
      image: review.image || "",
      isVisible: review.isVisible ?? true,
    });

    setError("");
    setShowModal(true);
  };

  // ==================== CLOSE MODAL ====================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingReview(null);
    setForm(initialForm);
    setError("");
  };

  // ==================== FORM CHANGE ====================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==================== ADD / UPDATE REVIEW ====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const name = form.name.trim();
    const role = form.role.trim();
    const comment = form.comment.trim();
    const image = form.image.trim();
    const rating = Number(form.rating);

    if (!name) {
      setError("Customer name is required.");
      return;
    }

    if (!comment) {
      setError("Review comment is required.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      const isEditing = Boolean(editingReview);

      const url = isEditing
        ? `http://localhost:5000/api/reviews/${editingReview.id}`
        : "http://localhost:5000/api/reviews";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          role: role || null,
          rating,
          comment,
          image: image || null,
          isVisible: Boolean(form.isVisible),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update review"
              : "Failed to add review")
        );
      }

      closeModal();

      await fetchReviews();
    } catch (error) {
      console.error(
        isEditing
          ? "Update review error:"
          : "Add review error:",
        error
      );

      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==================== DELETE REVIEW ====================

  const handleDelete = async (review) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the review from "${review.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(review.id);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/reviews/${review.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete review"
        );
      }

      await fetchReviews();
    } catch (error) {
      console.error("Delete review error:", error);

      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ==================== TOGGLE VISIBILITY ====================

  const toggleVisibility = async (review) => {
    try {
      setTogglingId(review.id);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/reviews/${review.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: review.name,
            role: review.role || null,
            rating: Number(review.rating),
            comment: review.comment,
            image: review.image || null,
            isVisible: !review.isVisible,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update review visibility"
        );
      }

      await fetchReviews();
    } catch (error) {
      console.error(
        "Toggle review visibility error:",
        error
      );

      alert(error.message);
    } finally {
      setTogglingId(null);
    }
  };

  // ==================== SEARCH ====================

  const filteredReviews = reviews.filter((review) => {
    const query = search.toLowerCase();

    return (
      review.name?.toLowerCase().includes(query) ||
      review.role?.toLowerCase().includes(query) ||
      review.comment?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* ==================== HEADER ==================== */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c982]">
            Customer Feedback
          </p>

          <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            Reviews
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage customer reviews displayed on your restaurant website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
        >
          <Plus size={18} />
          Add Review
        </button>
      </div>

      {/* ==================== SEARCH ==================== */}

      <div className="mt-8">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50"
          />
        </div>
      </div>

      {/* ==================== REVIEWS LIST ==================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
        {loading ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

            <p className="mt-4 text-sm text-white/40">
              Loading reviews...
            </p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
              <MessageSquareQuote
                size={22}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-2xl text-white">
              {search
                ? "No Matching Reviews"
                : "No Reviews Found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
              {search
                ? "Try searching with a different name or keyword."
                : "Add your first customer review to display it on your website."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
              >
                <Plus size={18} />
                Add First Review
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="px-5 py-6 transition hover:bg-white/2 sm:px-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Review Info */}

                  <div className="flex min-w-0 gap-4">
                    {/* Avatar */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-serif text-lg text-[#e8c982]">
                          {review.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Name + Visibility */}

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-white">
                          {review.name}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            review.isVisible
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-white/5 text-white/30"
                          }`}
                        >
                          {review.isVisible
                            ? "Visible"
                            : "Hidden"}
                        </span>
                      </div>

                      {/* Role */}

                      {review.role && (
                        <p className="mt-1 text-xs text-white/30">
                          {review.role}
                        </p>
                      )}

                      {/* Rating */}

                      <div className="mt-2 flex items-center gap-1">
                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            fill={
                              index < review.rating
                                ? "#e8c982"
                                : "transparent"
                            }
                            className={
                              index < review.rating
                                ? "text-[#e8c982]"
                                : "text-white/15"
                            }
                          />
                        ))}

                        <span className="ml-1 text-xs text-white/40">
                          {review.rating}/5
                        </span>
                      </div>

                      {/* Comment */}

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
                        “{review.comment}”
                      </p>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex shrink-0 gap-2 lg:ml-5">
                    {/* Edit */}

                    <button
                      type="button"
                      title="Edit review"
                      onClick={() =>
                        openEditModal(review)
                      }
                      className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982]"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Visibility */}

                    <button
                      type="button"
                      title={
                        review.isVisible
                          ? "Hide review"
                          : "Show review"
                      }
                      onClick={() =>
                        toggleVisibility(review)
                      }
                      disabled={
                        togglingId === review.id
                      }
                      className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {togglingId === review.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#e8c982]" />
                      ) : review.isVisible ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      title="Delete review"
                      onClick={() =>
                        handleDelete(review)
                      }
                      disabled={
                        deletingId === review.id
                      }
                      className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === review.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-red-300" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================
          ADD / EDIT REVIEW MODAL
      ================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative z-10000 my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8c982]">
                  Customer Feedback
                </p>

                <h2 className="mt-1 font-serif text-2xl text-white">
                  {editingReview
                    ? "Edit Review"
                    : "Add Review"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Name + Role */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Customer Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    autoFocus
                    disabled={saving}
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/60">
                    Role / Position
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Food Enthusiast"
                    disabled={saving}
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Rating */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-white/60">
                  Rating
                </label>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d6ad60]/50 disabled:opacity-50"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              {/* Comment */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-white/60">
                  Review Comment
                </label>

                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write the customer review..."
                  disabled={saving}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50 disabled:opacity-50"
                />
              </div>

              {/* Image */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-white/60">
                  Customer Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={saving}
                  className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50 disabled:opacity-50"
                />
              </div>

              {/* Visibility */}

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-4">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={form.isVisible}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-4 w-4 accent-[#d6ad60]"
                />

                <div>
                  <p className="text-sm text-white">
                    Show this review on website
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    Hidden reviews will not appear publicly.
                  </p>
                </div>
              </label>

              {/* Buttons */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0d0d0d]/30 border-t-[#0d0d0d]" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      {editingReview
                        ? "Update Review"
                        : "Save Review"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;