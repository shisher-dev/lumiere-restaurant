import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH FOODS + CATEGORIES
  // ==========================================

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError("");

        const [foodsResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:5000/api/foods"),
          fetch("http://localhost:5000/api/categories"),
        ]);

        const foodsData = await foodsResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (!foodsResponse.ok) {
          throw new Error(
            foodsData.message || "Failed to fetch foods"
          );
        }

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData.message || "Failed to fetch categories"
          );
        }

        setFoods(foodsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error("Menu fetch error:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // ==========================================
  // FILTER FOODS
  // ==========================================

  const filteredFoods = foods.filter((food) => {
    const categoryName = food.category?.name || "";

    const matchesCategory =
      selectedCategory === "All" ||
      categoryName === selectedCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return (
      food.isAvailable &&
      matchesCategory &&
      matchesSearch
    );
  });

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
                Our Menu
              </span>

              <span className="h-px w-10 bg-[#d6ad60]" />
            </div>

            <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
              Discover Our
              <span className="text-[#e8c982]"> Flavors</span>
            </h1>
          </div>

          <div className="mt-16 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d6ad60]" />

            <p className="mt-5 text-sm text-white/40">
              Loading our delicious menu...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <section className="min-h-screen bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
                Our Menu
              </span>

              <span className="h-px w-10 bg-[#d6ad60]" />
            </div>

            <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
              Discover Our
              <span className="text-[#e8c982]"> Flavors</span>
            </h1>
          </div>

          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
            <h2 className="font-serif text-2xl text-white">
              Unable to Load Menu
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full border border-[#d6ad60] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
              Our Menu
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
            Discover Our
            <span className="text-[#e8c982]"> Flavors</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            Explore our carefully crafted selection of dishes, prepared
            with quality ingredients and a passion for exceptional taste.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-white/10 bg-[#121212] py-3.5 pl-11 pr-5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d6ad60]/50"
            />
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-wider transition ${
                selectedCategory === "All"
                  ? "border-[#d6ad60] bg-[#d6ad60] text-[#0d0d0d]"
                  : "border-white/10 text-white/50 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-wider transition ${
                  selectedCategory === category.name
                    ? "border-[#d6ad60] bg-[#d6ad60] text-[#0d0d0d]"
                    : "border-white/10 text-white/50 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Food Grid */}
        {filteredFoods.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFoods.map((food) => (
              <Link
                key={food.id}
                to={`/food/${food.id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  {food.isFeatured && (
                    <span className="absolute left-4 top-4 rounded-full border border-[#d6ad60]/50 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#e8c982] backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d6ad60]">
                        {food.category?.name || "Signature"}
                      </p>

                      <h2 className="mt-2 font-serif text-xl text-white">
                        {food.name}
                      </h2>
                    </div>

                    <span className="whitespace-nowrap text-sm font-medium text-[#e8c982]">
                      ৳{Number(food.price).toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">
                    {food.description}
                  </p>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-[#e8c982]">
                      ★
                    </span>

                    <span className="text-xs text-white/50">
                      {Number(food.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 transition group-hover:text-[#e8c982]">
                    View Details

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-14 rounded-2xl border border-white/10 bg-[#121212] px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-white">
              No Dishes Found
            </h2>

            <p className="mt-3 text-sm text-white/40">
              {searchTerm
                ? `No dishes match "${searchTerm}".`
                : "Our delicious menu is being prepared. Please check back soon."}
            </p>

            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-full border border-[#d6ad60] px-6 py-3 text-xs uppercase tracking-wider text-[#e8c982] transition hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;