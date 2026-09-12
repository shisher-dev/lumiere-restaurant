import { useEffect, useState } from "react";
import {
  Utensils,
  FolderOpen,
  Star,
  Images,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard/stats";

const initialStats = [
  {
    title: "Total Foods",
    value: 0,
    icon: Utensils,
    description: "Food items",
  },
  {
    title: "Categories",
    value: 0,
    icon: FolderOpen,
    description: "Food categories",
  },
  {
    title: "Reviews",
    value: 0,
    icon: Star,
    description: "Customer reviews",
  },
  {
    title: "Gallery",
    value: 0,
    icon: Images,
    description: "Gallery images",
  },
];

function Dashboard() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // FETCH DASHBOARD STATISTICS
  // ==================================================

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch dashboard statistics"
        );
      }

      const data = result.data;

      setStats([
        {
          title: "Total Foods",
          value: data.totalFoods ?? 0,
          icon: Utensils,
          description: "Food items",
        },
        {
          title: "Categories",
          value: data.totalCategories ?? 0,
          icon: FolderOpen,
          description: "Food categories",
        },
        {
          title: "Reviews",
          value: data.totalReviews ?? 0,
          icon: Star,
          description: "Customer reviews",
        },
        {
          title: "Gallery",
          value: data.totalGalleryImages ?? 0,
          icon: Images,
          description: "Gallery images",
        },
      ]);
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err.message || "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOAD DATA
  // ==================================================

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    window.location.href = "/admin/login";
  };

  // ==================================================
  // DASHBOARD
  // ==================================================

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d6ad60]">
              Lumière
            </p>

            <h1 className="mt-1 font-serif text-2xl text-[#f5dfaa]">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:border-red-400/30 hover:text-red-400"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm text-white/40">
            Welcome back, Admin
          </p>

          <h2 className="mt-2 font-serif text-3xl text-white">
            Restaurant Overview
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-white/10 bg-[#121212] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30"
              >
                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#e8c982]"
                    />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-white/20 transition group-hover:text-[#d6ad60]"
                  />

                </div>

                <p className="mt-6 text-sm text-white/45">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-semibold text-white">
                  {loading ? (
                    <span className="inline-block h-9 w-10 animate-pulse rounded bg-white/10" />
                  ) : (
                    stat.value
                  )}
                </p>

                <p className="mt-2 text-xs text-white/30">
                  {stat.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Quick Actions */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8">

          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#d6ad60]">
              Management
            </p>

            <h3 className="mt-2 font-serif text-2xl text-white">
              Quick Actions
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* FOODS */}
            <Link
              to="/admin/foods"
              className="rounded-xl border border-white/10 bg-white/3 p-5 text-left transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/5"
            >
              <Utensils
                size={20}
                className="text-[#e8c982]"
              />

              <p className="mt-4 text-sm font-medium">
                Manage Foods
              </p>

              <p className="mt-1 text-xs text-white/35">
                Add or edit menu items
              </p>
            </Link>

            {/* CATEGORIES */}
            <Link
              to="/admin/categories"
              className="rounded-xl border border-white/10 bg-white/3 p-5 text-left transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/5"
            >
              <FolderOpen
                size={20}
                className="text-[#e8c982]"
              />

              <p className="mt-4 text-sm font-medium">
                Categories
              </p>

              <p className="mt-1 text-xs text-white/35">
                Manage food categories
              </p>
            </Link>

            {/* REVIEWS */}
            <Link
              to="/admin/reviews"
              className="rounded-xl border border-white/10 bg-white/3 p-5 text-left transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/5"
            >
              <Star
                size={20}
                className="text-[#e8c982]"
              />

              <p className="mt-4 text-sm font-medium">
                Reviews
              </p>

              <p className="mt-1 text-xs text-white/35">
                Manage customer reviews
              </p>
            </Link>

            {/* GALLERY */}
            <Link
              to="/admin/gallery"
              className="rounded-xl border border-white/10 bg-white/3 p-5 text-left transition hover:border-[#d6ad60]/30 hover:bg-[#d6ad60]/5"
            >
              <Images
                size={20}
                className="text-[#e8c982]"
              />

              <p className="mt-4 text-sm font-medium">
                Gallery
              </p>

              <p className="mt-1 text-xs text-white/35">
                Manage restaurant photos
              </p>
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;