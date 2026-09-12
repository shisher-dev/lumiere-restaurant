import {
  Plus,
  FolderOpen,
  Pencil,
  Trash2,
  X,
  Save,
  Search,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
};

function Categories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // ==================== FETCH CATEGORIES ====================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/categories"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch categories"
        );
      }

      setCategories(data.data || data);
    } catch (error) {
      console.error("Fetch categories error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==================== OPEN ADD MODAL ====================

  const openAddModal = () => {
    setEditingCategory(null);
    setForm(initialForm);
    setError("");
    setShowModal(true);
  };

  // ==================== OPEN EDIT MODAL ====================

  const openEditModal = (category) => {
    setEditingCategory(category);

    setForm({
      name: category.name || "",
    });

    setError("");
    setShowModal(true);
  };

  // ==================== CLOSE MODAL ====================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingCategory(null);
    setForm(initialForm);
    setError("");
  };

  // ==================== FORM CHANGE ====================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==================== ADD / UPDATE CATEGORY ====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const categoryName = form.name.trim();

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      const isEditing = Boolean(editingCategory);

      const url = isEditing
        ? `http://localhost:5000/api/categories/${editingCategory.id}`
        : "http://localhost:5000/api/categories";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update category"
              : "Failed to add category")
        );
      }

      closeModal();

      await fetchCategories();
    } catch (error) {
      console.error(
        isEditing
          ? "Update category error:"
          : "Add category error:",
        error
      );

      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==================== DELETE CATEGORY ====================

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?\n\nIf this category has foods assigned to it, those foods may also be affected.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(category.id);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/categories/${category.id}`,
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
          data.message || "Failed to delete category"
        );
      }

      await fetchCategories();
    } catch (error) {
      console.error("Delete category error:", error);

      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ==================== SEARCH ====================

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ==================== HEADER ==================== */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8c982]">
            Menu Management
          </p>

          <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            Categories
          </h1>

          <p className="mt-2 text-sm text-white/40">
            Organize your restaurant menu into categories.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
        >
          <Plus size={18} />
          Add Category
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
            placeholder="Search categories..."
            className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50"
          />
        </div>
      </div>

      {/* ==================== CATEGORY LIST ==================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
        {loading ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

            <p className="mt-4 text-sm text-white/40">
              Loading categories...
            </p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
              <FolderOpen
                size={22}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-2xl text-white">
              {search
                ? "No Matching Categories"
                : "No Categories Found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
              {search
                ? "Try searching with a different category name."
                : "Create your first category to organize your restaurant menu."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d6ad60] px-5 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:bg-[#e8c982]"
              >
                <Plus size={18} />
                Add First Category
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Header */}

            <div className="hidden grid-cols-[1fr_160px_120px] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-wider text-white/30 sm:grid">
              <div>Category</div>
              <div>Foods</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Category Items */}

            <div className="divide-y divide-white/5">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="grid gap-4 px-5 py-5 transition hover:bg-white/2 sm:grid-cols-[1fr_160px_120px] sm:items-center sm:px-6"
                >
                  {/* Category */}

                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                      <FolderOpen
                        size={19}
                        className="text-[#e8c982]"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-white">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/30">
                        Category #{category.id}
                      </p>
                    </div>
                  </div>

                  {/* Food Count */}

                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Utensils
                      size={15}
                      className="text-[#d6ad60]"
                    />

                    <span>
                      {category._count?.foods ?? 0} Foods
                    </span>
                  </div>

                  {/* Actions */}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      title="Edit category"
                      onClick={() =>
                        openEditModal(category)
                      }
                      className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/10 hover:text-[#e8c982]"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      title="Delete category"
                      onClick={() =>
                        handleDelete(category)
                      }
                      disabled={
                        deletingId === category.id
                      }
                      className="rounded-lg border border-white/10 p-2 text-white/40 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === category.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-red-300" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ==================== ADD / EDIT MODAL ==================== */}

      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative z-10000 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#e8c982]">
                  Menu Management
                </p>

                <h2 className="mt-1 font-serif text-2xl text-white">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
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

              <label className="mb-2 block text-xs font-medium text-white/60">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Main Course"
                autoFocus
                disabled={saving}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50 disabled:opacity-50"
              />

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
                      {editingCategory
                        ? "Update Category"
                        : "Save Category"}
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

export default Categories;