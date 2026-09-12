import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  X,
  Save,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL =
  "https://lumiere-restaurant-1dgb.onrender.com/api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  image: "",
  publicId: "",
  rating: "0",
  isAvailable: true,
  isFeatured: false,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function Foods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [error, setError] = useState("");

  // =========================================================
  // TOKEN
  // =========================================================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================================================
  // SAFE JSON RESPONSE
  // =========================================================

  const parseResponse = async (response) => {
    const text = await response.text();

    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `Server returned an invalid response (${response.status}).`
      );
    }
  };

  // =========================================================
  // FETCH FOODS
  // =========================================================

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/foods`);

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch foods."
        );
      }

      const foodList = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setFoods(foodList);
    } catch (error) {
      console.error("Fetch foods error:", error);

      setError(
        error.message || "Failed to fetch foods."
      );

      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH CATEGORIES
  // =========================================================

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${API_URL}/categories`
      );

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch categories."
        );
      }

      const categoryList = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setCategories(categoryList);
    } catch (error) {
      console.error(
        "Fetch categories error:",
        error
      );
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  // =========================================================
  // CLEANUP IMAGE PREVIEW
  // =========================================================

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // IMAGE SELECT
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError(
        "Only JPG, PNG, and WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError(
        "Image size must be less than 5MB."
      );

      e.target.value = "";
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(previewUrl);
  };

  // =========================================================
  // UPLOAD IMAGE
  // =========================================================

  const uploadImageToCloudinary = async () => {
    if (!selectedImage) {
      return {
        url: form.image,
        publicId: form.publicId,
      };
    }

    try {
      setImageUploading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication required. Please login again."
        );
      }

      const formData = new FormData();

      formData.append("image", selectedImage);

      const response = await fetch(
        `${API_URL}/upload/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload image."
        );
      }

      const uploadedUrl = data.data?.url;
      const uploadedPublicId =
        data.data?.publicId;

      if (!uploadedUrl) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      if (!uploadedPublicId) {
        throw new Error(
          "Cloudinary did not return a public ID."
        );
      }

      return {
        url: uploadedUrl,
        publicId: uploadedPublicId,
      };
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      throw error;
    } finally {
      setImageUploading(false);
    }
  };

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    setEditingFood(null);

    setForm({
      ...initialForm,
    });

    setSelectedImage(null);
    setImagePreview("");

    setError("");
    setShowModal(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditModal = (food) => {
    setEditingFood(food);

    const existingImage =
      food.image || "";

    setForm({
      name: food.name || "",

      description:
        food.description || "",

      price:
        food.price !== undefined &&
        food.price !== null
          ? String(food.price)
          : "",

      categoryId:
        food.categoryId
          ? String(food.categoryId)
          : food.category?.id
          ? String(food.category.id)
          : "",

      image: existingImage,

      publicId:
        food.publicId || "",

      rating:
        food.rating !== undefined &&
        food.rating !== null
          ? String(food.rating)
          : "0",

      isAvailable:
        Boolean(food.isAvailable),

      isFeatured:
        Boolean(food.isFeatured),
    });

    setSelectedImage(null);
    setImagePreview(existingImage);

    setError("");
    setShowModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (saving || imageUploading) {
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setShowModal(false);
    setEditingFood(null);

    setForm({
      ...initialForm,
    });

    setSelectedImage(null);
    setImagePreview("");
    setError("");
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!form.name.trim()) {
      setError("Food name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    const price = Number(form.price);

    if (
      form.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError("Please enter a valid price.");
      return;
    }

    const categoryId = Number(form.categoryId);

    if (
      !form.categoryId ||
      !Number.isInteger(categoryId) ||
      categoryId <= 0
    ) {
      setError("Please select a category.");
      return;
    }

    const rating = Number(form.rating);

    if (
      form.rating === "" ||
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5
    ) {
      setError(
        "Rating must be between 0 and 5."
      );
      return;
    }

    if (
      !form.image.trim() &&
      !selectedImage
    ) {
      setError("Please select an image.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication required. Please login again."
        );
      }

      // Upload new image if selected
      let imageUrl = form.image.trim();
      let imagePublicId =
        form.publicId || "";

      if (selectedImage) {
        const uploadedImage =
          await uploadImageToCloudinary();

        imageUrl = uploadedImage.url;
        imagePublicId =
          uploadedImage.publicId;
      }

      const isEditing =
        Boolean(editingFood);

      const url = isEditing
        ? `${API_URL}/foods/${editingFood.id}`
        : `${API_URL}/foods`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: form.name.trim(),

          description:
            form.description.trim(),

          price,

          categoryId,

          image: imageUrl,

          publicId: imagePublicId,

          rating,

          isAvailable:
            Boolean(form.isAvailable),

          isFeatured:
            Boolean(form.isFeatured),
        }),
      });

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update food."
              : "Failed to add food.")
        );
      }

      // Reset
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setShowModal(false);
      setEditingFood(null);

      setForm({
        ...initialForm,
      });

      setSelectedImage(null);
      setImagePreview("");
      setError("");

      await fetchFoods();
    } catch (error) {
      console.error(
        editingFood
          ? "Update food error:"
          : "Add food error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (food) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${food.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(food.id);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication required. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/foods/${food.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete food."
        );
      }

      setFoods((prev) =>
        prev.filter(
          (item) => item.id !== food.id
        )
      );
    } catch (error) {
      console.error(
        "Delete food error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete food."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // TOGGLE AVAILABILITY
  // =========================================================

  const handleToggleAvailability = async (
    food
  ) => {
    try {
      setTogglingId(food.id);

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication required. Please login again."
        );
      }

      const categoryId = Number(
        food.categoryId ||
          food.category?.id
      );

      if (
        !Number.isInteger(categoryId) ||
        categoryId <= 0
      ) {
        throw new Error(
          "This food does not have a valid category."
        );
      }

      const response = await fetch(
        `${API_URL}/foods/${food.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: food.name,

            description:
              food.description || "",

            price: Number(
              food.price || 0
            ),

            categoryId,

            image:
              food.image || "",

            publicId:
              food.publicId || "",

            rating: Number(
              food.rating || 0
            ),

            isFeatured:
              Boolean(
                food.isFeatured
              ),

            isAvailable:
              !Boolean(
                food.isAvailable
              ),
          }),
        }
      );

      const data =
        await parseResponse(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update availability."
        );
      }

      const updatedFood =
        data.data;

      if (updatedFood) {
        setFoods((prev) =>
          prev.map((item) =>
            item.id === food.id
              ? updatedFood
              : item
          )
        );
      } else {
        await fetchFoods();
      }
    } catch (error) {
      console.error(
        "Toggle availability error:",
        error
      );

      alert(
        error.message ||
          "Failed to update availability."
      );
    } finally {
      setTogglingId(null);
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const searchTerm =
    search.trim().toLowerCase();

  const filteredFoods = foods.filter(
    (food) =>
      food.name
        ?.toLowerCase()
        .includes(searchTerm)
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c982]">
            Menu Management
          </p>

          <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            Foods
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Manage your restaurant
            menu and food items.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
        >
          <Plus size={18} />
          Add Food
        </button>
      </div>

      {/* ERROR */}

      {error && !showModal && (
        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* SEARCH */}

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121212] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search food..."
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50"
          />
        </div>

        <div className="text-sm text-white/40">
          {filteredFoods.length}{" "}
          {filteredFoods.length === 1
            ? "Food"
            : "Foods"}
        </div>
      </div>

      {/* FOOD TABLE */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
        {loading ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

            <p className="mt-4 text-sm text-white/40">
              Loading foods...
            </p>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
              <Star
                size={22}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-2xl text-white">
              No Foods Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
              {search
                ? "No food matches your search."
                : "Your menu is empty. Add your first food item to get started."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
              >
                <Plus size={18} />
                Add First Food
              </button>
            )}
          </div>
        ) : (
          <>
            {/* DESKTOP */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Food
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Category
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Price
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFoods.map(
                    (food) => (
                      <tr
                        key={food.id}
                        className="border-b border-white/5 transition hover:bg-white/2"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                              {food.image ? (
                                <img
                                  src={food.image}
                                  alt={food.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-white/20">
                                  <Eye size={18} />
                                </div>
                              )}
                            </div>

                            <div>
                              <h3 className="font-medium text-white">
                                {food.name}
                              </h3>

                              <p className="mt-1 max-w-xs truncate text-xs text-white/35">
                                {food.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                            {food.category?.name ||
                              food.category ||
                              "Uncategorized"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-[#e8c982]">
                            ৳
                            {Number(
                              food.price || 0
                            ).toFixed(2)}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Star
                              size={14}
                              fill="currentColor"
                              className="text-[#e8c982]"
                            />

                            <span className="text-sm text-white/70">
                              {Number(
                                food.rating || 0
                              ).toFixed(1)}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ${
                              food.isAvailable
                                ? "bg-emerald-500/10 text-emerald-300"
                                : "bg-red-500/10 text-red-300"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                food.isAvailable
                                  ? "bg-emerald-400"
                                  : "bg-red-400"
                              }`}
                            />

                            {food.isAvailable
                              ? "Available"
                              : "Unavailable"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              title="Edit food"
                              onClick={() =>
                                openEditModal(
                                  food
                                )
                              }
                              className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982]"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              title={
                                food.isAvailable
                                  ? "Hide food"
                                  : "Show food"
                              }
                              onClick={() =>
                                handleToggleAvailability(
                                  food
                                )
                              }
                              disabled={
                                togglingId ===
                                food.id
                              }
                              className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {togglingId ===
                              food.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#e8c982]" />
                              ) : food.isAvailable ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>

                            <button
                              type="button"
                              title="Delete food"
                              onClick={() =>
                                handleDelete(
                                  food
                                )
                              }
                              disabled={
                                deletingId ===
                                food.id
                              }
                              className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId ===
                              food.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-red-300" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}

            <div className="divide-y divide-white/5 lg:hidden">
              {filteredFoods.map(
                (food) => (
                  <div
                    key={food.id}
                    className="p-5"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                        {food.image ? (
                          <img
                            src={food.image}
                            alt={food.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-white/20">
                            <Eye size={18} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-lg text-white">
                              {food.name}
                            </h3>

                            <p className="mt-1 text-xs text-white/35">
                              {food.category?.name ||
                                food.category ||
                                "Uncategorized"}
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-semibold text-[#e8c982]">
                            ৳
                            {Number(
                              food.price || 0
                            ).toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Star
                              size={14}
                              fill="currentColor"
                              className="text-[#e8c982]"
                            />

                            <span className="text-xs text-white/60">
                              {Number(
                                food.rating || 0
                              ).toFixed(1)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleAvailability(
                                food
                              )
                            }
                            disabled={
                              togglingId ===
                              food.id
                            }
                            className={`rounded-full px-2.5 py-1 text-[10px] transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              food.isAvailable
                                ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                : "bg-red-500/10 text-red-300 hover:bg-red-500/20"
                            }`}
                          >
                            {togglingId ===
                            food.id
                              ? "Updating..."
                              : food.isAvailable
                              ? "Available"
                              : "Unavailable"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            food
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs text-white/55 transition hover:border-[#d6ad60]/30 hover:text-[#e8c982]"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggleAvailability(
                            food
                          )
                        }
                        disabled={
                          togglingId ===
                          food.id
                        }
                        className="flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {togglingId ===
                        food.id ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#e8c982]" />
                        ) : food.isAvailable ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            food
                          )
                        }
                        disabled={
                          deletingId ===
                          food.id
                        }
                        className="flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-white/40 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId ===
                        food.id ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-red-300" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative z-10000 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8c982]">
                  Menu Management
                </p>

                <h2 className="mt-1 font-serif text-2xl text-white">
                  {editingFood
                    ? "Edit Food"
                    : "Add New Food"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={
                  saving ||
                  imageUploading
                }
                className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* NAME */}

              <div>
                <label className="mb-2 block text-[10px] text-white/50">
                  Food Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Grilled Salmon"
                  className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="mt-4">
                <label className="mb-2 block text-[10px] text-white/50">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe this food..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                />
              </div>

              {/* PRICE + CATEGORY */}

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] text-white/50">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="250.00"
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] text-white/50">
                    Category
                  </label>

                  <select
                    name="categoryId"
                    value={
                      form.categoryId
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d6ad60]/50"
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* IMAGE */}

              <div className="mt-4">
                <label className="mb-2 block text-[10px] text-white/50">
                  Food Image
                </label>

                <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
                  {imagePreview ? (
                    <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={imagePreview}
                        alt="Food preview"
                        className="h-56 w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3 flex max-w-[90%] items-center gap-2 truncate rounded-full bg-black/60 px-3 py-1.5 text-[10px] text-white/70 backdrop-blur-md">
                        <ImageIcon size={13} />

                        <span className="truncate">
                          {selectedImage
                            ? selectedImage.name
                            : "Current image"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/2">
                      <div className="text-center">
                        <ImageIcon
                          size={30}
                          className="mx-auto text-white/20"
                        />

                        <p className="mt-3 text-xs text-white/30">
                          No image selected
                        </p>
                      </div>
                    </div>
                  )}

                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d6ad60]/30 bg-[#d6ad60]/10 px-4 py-3 text-sm font-medium text-[#e8c982] transition hover:bg-[#d6ad60]/20 ${
                      imageUploading
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <Upload size={17} />

                    {selectedImage
                      ? "Choose Different Image"
                      : "Choose Image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                      disabled={
                        imageUploading ||
                        saving
                      }
                    />
                  </label>

                  <p className="mt-3 text-center text-[10px] text-white/25">
                    JPG, PNG or WEBP • Maximum 5MB
                  </p>

                  {imageUploading && (
                    <div className="mt-4 rounded-lg border border-[#d6ad60]/20 bg-[#d6ad60]/5 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#e8c982]" />

                        <span className="text-xs text-[#e8c982]">
                          Uploading image to Cloudinary...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RATING */}

              <div className="mt-4">
                <label className="mb-2 block text-[10px] text-white/50">
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.9"
                  className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d6ad60]/50"
                />
              </div>

              {/* AVAILABLE + FEATURED */}

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] p-4 transition hover:border-[#d6ad60]/30">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={
                      form.isAvailable
                    }
                    onChange={
                      handleChange
                    }
                    className="h-4 w-4 accent-[#d6ad60]"
                  />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Available
                    </p>

                    <p className="mt-1 text-[9px] text-white/35">
                      Show this food as available
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] p-4 transition hover:border-[#d6ad60]/30">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={
                      form.isFeatured
                    }
                    onChange={
                      handleChange
                    }
                    className="h-4 w-4 accent-[#d6ad60]"
                  />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Featured
                    </p>

                    <p className="mt-1 text-[9px] text-white/35">
                      Show in featured dishes
                    </p>
                  </div>
                </label>
              </div>

              {/* ACTIONS */}

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving ||
                    imageUploading
                  }
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    imageUploading
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ||
                  imageUploading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0d0d0d]/30 border-t-[#0d0d0d]" />

                      {imageUploading
                        ? "Uploading..."
                        : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      {editingFood
                        ? "Save Changes"
                        : "Save Food"}
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

export default Foods;