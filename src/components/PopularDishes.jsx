import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const fallbackFoods = [
  {
    id: "fallback-1",
    name: "Signature Steak",
    description:
      "Tender premium steak prepared with rich flavors and our signature sauce.",
    price: "৳1,850",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    category: "Signature",
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Truffle Pasta",
    description:
      "Creamy handmade pasta finished with parmesan and aromatic truffle.",
    price: "৳950",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    category: "Pasta",
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Fresh Salmon",
    description:
      "Freshly prepared salmon served with seasonal vegetables and herbs.",
    price: "৳1,450",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
    category: "Seafood",
    rating: 5,
  },
];

function PopularDishes() {
  const [foods, setFoods] = useState(fallbackFoods);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/foods"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid foods response");
        }

        const availableFoods = result.data.filter(
          (food) => food.isAvailable
        );

        if (availableFoods.length > 0) {
          const featuredFoods = availableFoods.filter(
            (food) => food.isFeatured
          );

          setFoods(
            (featuredFoods.length > 0
              ? featuredFoods
              : availableFoods
            ).slice(0, 3)
          );
        }
      } catch (error) {
        console.error("Popular dishes error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section
      id="menu"
      className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                Our Selection
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Popular Dishes
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
              Discover some of our guests&apos; favorite dishes,
              prepared with fresh ingredients and unforgettable flavors.
            </p>
          </div>

          <Link
            to="/menu"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-[#e8c982] transition-colors duration-300 hover:text-white"
          >
            View Full Menu

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212]"
              >
                <div className="h-72 animate-pulse bg-white/5" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <article
                key={food.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-all duration-500 hover:-translate-y-1 hover:border-[#d6ad60]/40"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
                    {food.category?.name ||
                      food.category ||
                      "Signature"}
                  </span>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    <Star
                      size={13}
                      fill="currentColor"
                      strokeWidth={1.5}
                      className="text-[#e8c982]"
                    />

                    <span className="text-xs font-medium text-white">
                      {Number(food.rating || 0).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl leading-tight text-white">
                      {food.name}
                    </h3>

                    <span className="shrink-0 text-base font-semibold text-[#e8c982]">
                      ৳{Number(food.price).toLocaleString("en-BD")}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">
                    {food.description}
                  </p>

                  <Link
                    to={`/food/${food.id}`}
                    className="group/details mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition-colors duration-300 hover:text-white"
                  >
                    View Details

                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover/details:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularDishes;