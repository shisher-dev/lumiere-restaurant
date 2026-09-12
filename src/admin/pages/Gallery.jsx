import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Image as ImageIcon,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Search,
  Images,
  Upload,
} from "lucide-react";

const API_URL =
  "https://lumiere-restaurant-1dgb.onrender.com/api/gallery";

const ADMIN_API_URL =
  "https://lumiere-restaurant-1dgb.onrender.com/api/gallery/admin";

const UPLOAD_API =
  "https://lumiere-restaurant-1dgb.onrender.com/api/upload/image";

const initialForm = {
  image: "",
  publicId: "",
  title: "",
  category: "",
  isVisible: true,
};

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [error, setError] = useState("");

  // =========================
  // GET ADMIN TOKEN
  // =========================
  const getToken = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error(
        "Admin session expired. Please log in again."
      );
    }

    return token;
  };

  // =========================
  // FETCH ADMIN GALLERY
  // =========================
  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(ADMIN_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load gallery"
        );
      }

      setGallery(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load gallery images."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================
  // IMAGE PREVIEW
  // =========================
  useEffect(() => {
    if (!selectedImage) return;

    const url = URL.createObjectURL(selectedImage);

    setImagePreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedImage]);

  // =========================
  // FILTER / SEARCH
  // =========================
  const filteredGallery = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return gallery;

    return gallery.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      );
    });
  }, [gallery, search]);

  // =========================
  // OPEN ADD MODAL
  // =========================
  const openAddModal = () => {
    setEditingItem(null);
    setForm({ ...initialForm });
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    setIsModalOpen(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openEditModal = (item) => {
    setEditingItem(item);

    setForm({
      image: item.image || "",
      publicId: item.publicId || "",
      title: item.title || "",
      category: item.category || "",
      isVisible: item.isVisible ?? true,
    });

    setSelectedImage(null);
    setImagePreview(item.image || "");
    setError("");
    setIsModalOpen(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    if (saving || imageUploading) return;

    setIsModalOpen(false);
    setEditingItem(null);
    setForm({ ...initialForm });
    setSelectedImage(null);
    setImagePreview("");
    setError("");
  };

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // IMAGE SELECT
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Image size must be 5MB or less.");

      e.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);
  };

  // =========================
  // UPLOAD IMAGE TO CLOUDINARY
  // =========================
  const uploadImageToCloudinary = async () => {
    // No new image selected.
    // Keep existing image.
    if (!selectedImage) {
      return {
        url: form.image,
        publicId: form.publicId,
      };
    }

    const token = getToken();

    try {
      setImageUploading(true);

      const formData = new FormData();

      formData.append("image", selectedImage);

      const response = await fetch(UPLOAD_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload image."
        );
      }

      const imageUrl = data.data?.url;
      const publicId = data.data?.publicId;

      if (!imageUrl) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      if (!publicId) {
        throw new Error(
          "Cloudinary did not return a public ID."
        );
      }

      return {
        url: imageUrl,
        publicId,
      };
    } finally {
      setImageUploading(false);
    }
  };

  // =========================
  // SAVE GALLERY IMAGE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // New item requires an image.
    if (!editingItem && !selectedImage) {
      setError("Please choose an image.");
      return;
    }

    // Existing item can keep current image.
    if (
      editingItem &&
      !selectedImage &&
      !form.image.trim()
    ) {
      setError("Please choose an image.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      // Upload only when a new image was selected.
      const uploadResult =
        await uploadImageToCloudinary();

      const imageUrl = uploadResult.url;
      const publicId = uploadResult.publicId;

      if (!imageUrl) {
        throw new Error("Image upload failed.");
      }

      const url = editingItem
        ? `${API_URL}/${editingItem.id}`
        : API_URL;

      const method = editingItem
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: imageUrl,
          publicId: publicId || null,
          title:
            form.title.trim() || null,
          category:
            form.category.trim() || null,
          isVisible: form.isVisible,
        }),
      });

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save gallery image."
        );
      }

      closeModal();

      await fetchGallery();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE IMAGE
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete image."
        );
      }

      setGallery((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to delete image."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // TOGGLE VISIBILITY
  // =========================
  const handleToggleVisibility = async (
    item
  ) => {
    try {
      setTogglingId(item.id);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: item.image,
            publicId:
              item.publicId || null,
            title: item.title || null,
            category:
              item.category || null,
            isVisible:
              !item.isVisible,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update visibility."
        );
      }

      setGallery((prev) =>
        prev.map((galleryItem) =>
          galleryItem.id === item.id
            ? {
                ...galleryItem,
                isVisible:
                  !galleryItem.isVisible,
              }
            : galleryItem
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to update visibility."
      );
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#d6ad60]">
            Visual Showcase
          </p>

          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Gallery
          </h1>

          <p className="mt-2 max-w-xl text-sm text-white/45">
            Manage restaurant photos displayed on
            your public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d6ad60] px-5 py-3 text-sm font-medium text-[#0d0d0d] transition hover:bg-[#e8c982]"
        >
          <Plus size={17} />
          Add Image
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && !isModalOpen && (
        <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* =========================
          SEARCH
      ========================= */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search gallery..."
            className="h-11 w-full rounded-lg border border-white/10 bg-[#111111] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50"
          />
        </div>

        <div className="text-xs text-white/35">
          {filteredGallery.length}{" "}
          {filteredGallery.length === 1
            ? "image"
            : "images"}
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      {loading ? (
        <div className="flex min-h-87.5 items-center justify-center rounded-xl border border-white/10 bg-[#111111]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

            <p className="text-sm text-white/40">
              Loading gallery...
            </p>
          </div>
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111111] px-6 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/25 bg-[#d6ad60]/10">
            <Images
              size={24}
              className="text-[#d6ad60]"
            />
          </div>

          <h2 className="font-serif text-xl text-white">
            {search
              ? "No Images Found"
              : "No Gallery Images"}
          </h2>

          <p className="mt-2 max-w-md text-sm text-white/40">
            {search
              ? "Try a different search term."
              : "Add your first restaurant image to showcase your space, food and atmosphere."}
          </p>

          {!search && (
            <button
              onClick={openAddModal}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#d6ad60] px-5 py-3 text-sm font-medium text-[#0d0d0d] transition hover:bg-[#e8c982]"
            >
              <Plus size={17} />
              Add First Image
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition duration-300 hover:border-[#d6ad60]/30"
            >
              {/* IMAGE */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#181818]">
                <img
                  src={item.image}
                  alt={
                    item.title ||
                    "Gallery image"
                  }
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

                {/* VISIBILITY */}
                <div className="absolute left-3 top-3">
                  {item.isVisible ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-black/70 px-3 py-1.5 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
                      <Eye size={12} />
                      Visible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-medium text-white/40 backdrop-blur-md">
                      <EyeOff size={12} />
                      Hidden
                    </span>
                  )}
                </div>

                {/* HOVER ACTIONS */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-end gap-2 bg-linear-to-t from-black/90 to-transparent px-4 pb-4 pt-12 transition duration-300 group-hover:translate-y-0">
                  <button
                    onClick={() =>
                      handleToggleVisibility(
                        item
                      )
                    }
                    disabled={
                      togglingId === item.id
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/50 text-white/70 transition hover:border-[#d6ad60]/40 hover:text-[#e8c982] disabled:opacity-50"
                    title={
                      item.isVisible
                        ? "Hide image"
                        : "Show image"
                    }
                  >
                    {item.isVisible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      openEditModal(item)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/50 text-white/70 transition hover:border-[#d6ad60]/40 hover:text-[#e8c982]"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    disabled={
                      deletingId === item.id
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/10 bg-black/50 text-red-300/70 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-white">
                      {item.title ||
                        "Untitled Image"}
                    </h3>

                    {item.category && (
                      <p className="mt-1 text-xs text-[#d6ad60]">
                        {item.category}
                      </p>
                    )}
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <ImageIcon
                      size={15}
                      className="text-white/35"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#d6ad60]">
                  Gallery Management
                </p>

                <h2 className="mt-1 font-serif text-2xl text-white">
                  {editingItem
                    ? "Edit Image"
                    : "Add Image"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                disabled={
                  saving || imageUploading
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              {/* IMAGE UPLOAD */}
              <div>
                <label className="mb-2 block text-xs font-medium text-white/65">
                  Restaurant Image{" "}
                  <span className="text-red-400">
                    *
                  </span>
                </label>

                {/* PREVIEW */}
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                    <div className="aspect-video">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/90 to-transparent px-4 pb-4 pt-10">
                      <div>
                        <p className="text-xs text-white/70">
                          {selectedImage
                            ? selectedImage.name
                            : "Current image"}
                        </p>

                        {selectedImage && (
                          <p className="mt-1 text-[10px] text-white/35">
                            {(
                              selectedImage.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        )}
                      </div>

                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white/70 backdrop-blur-md transition hover:border-[#d6ad60]/40 hover:text-[#e8c982]">
                        <Upload size={14} />
                        Change Image

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={
                            handleImageChange
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex min-h-55 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0d0d0d] px-6 text-center transition hover:border-[#d6ad60]/40 hover:bg-[#121212]">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                      <Upload
                        size={24}
                        className="text-[#d6ad60]"
                      />
                    </div>

                    <p className="text-sm font-medium text-white">
                      Choose an image
                    </p>

                    <p className="mt-2 text-xs text-white/35">
                      JPG, PNG or WEBP
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      Maximum file size: 5MB
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#d6ad60] px-4 py-2.5 text-xs font-medium text-[#0d0d0d]">
                      <Upload size={14} />
                      Select Image
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* TITLE */}
              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-white/65">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Restaurant Interior"
                  className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                />
              </div>

              {/* CATEGORY */}
              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium text-white/65">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Interior, Food, Events..."
                  className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                />
              </div>

              {/* VISIBILITY */}
              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-[#0d0d0d] p-4">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={form.isVisible}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#d6ad60]"
                />

                <div>
                  <p className="text-sm text-white">
                    Show on website
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Hidden images will not appear
                    on the public gallery.
                  </p>
                </div>
              </label>

              {/* ERROR */}
              {error && (
                <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* BUTTONS */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving || imageUploading
                  }
                  className="rounded-lg border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:border-white/20 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving || imageUploading
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d6ad60] px-5 py-3 text-sm font-medium text-[#0d0d0d] transition hover:bg-[#e8c982] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {imageUploading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Uploading...
                    </>
                  ) : saving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {editingItem
                        ? "Save Changes"
                        : "Add Image"}
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

export default Gallery;