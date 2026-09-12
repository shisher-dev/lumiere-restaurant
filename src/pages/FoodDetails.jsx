import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  Loader2,
  Star,
} from "lucide-react";

function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/foods/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch food details."
          );
        }

        setFood(result.data);
      } catch (error) {
        console.error("Food details error:", error);

        setError(
          error.message ||
            "Something went wrong while loading this food."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-5 text-white">
        <div className="flex flex-col items-center text-center">
          <Loader2
            size={34}
            strokeWidth={1.5}
            className="animate-spin text-[#e8c982]"
          />

          <p className="mt-4 text-sm text-white/40">
            Loading food details...
          </p>
        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR / NOT FOUND
  // =========================================================

  if (error || !food) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-5 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <CircleAlert
              size={25}
              strokeWidth={1.5}
              className="text-[#e8c982]"
            />
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-tight text-white">
            Food Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-white/40">
            {error ||
              "Sorry, the food item you are looking for does not exist."}
          </p>

          <Link
            to="/menu"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d6ad60] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0d0d0d] transition-colors duration-300 hover:bg-[#e8c982]"
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const rating = Number(food.rating || 0);
  const price = Number(food.price || 0);

  const ratingLabel =
    rating >= 4.8
      ? "Guest Favorite"
      : rating >= 4.5
        ? "Highly Rated"
        : "Guest Rating";

  return (
    <section className="bg-[#0d0d0d] px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Back to Menu */}
        <Link
          to="/menu"
          className="group mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/40 transition-colors duration-300 hover:text-[#e8c982]"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Menu
        </Link>

        {/* Main Card */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">
          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="relative min-h-107.5 overflow-hidden lg:min-h-150">
            <img
              src={food.image}
              alt={food.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

            {/* Category */}
            {food.category?.name && (
              <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                  {food.category.name}
                </span>
              </div>
            )}

            {/* Availability */}
            <div className="absolute right-6 top-6">
              <span
                className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] backdrop-blur-md ${
                  food.isAvailable
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    : "border-red-400/20 bg-red-400/10 text-red-300"
                }`}
              >
                {food.isAvailable
                  ? "Available"
                  : "Currently Unavailable"}
              </span>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            {/* Eyebrow */}
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d6ad60]">
              Lumière Signature
            </p>

            {/* Name */}
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              {food.name}
            </h1>

            {/* Rating */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    strokeWidth={1.5}
                    fill={
                      star <= Math.round(rating)
                        ? "currentColor"
                        : "none"
                    }
                    className="text-[#e8c982]"
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-white">
                {rating.toFixed(1)}
              </span>

              <span className="h-4 w-px bg-white/10" />

              <span className="text-xs uppercase tracking-wider text-white/35">
                {ratingLabel}
              </span>
            </div>

            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-8 text-white/50 sm:text-base">
              {food.description}
            </p>

            {/* Price */}
            <div className="mt-8 border-y border-white/10 py-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Price
              </p>

              <p className="mt-2 font-serif text-3xl text-[#e8c982]">
                ৳
                {price.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* Availability Message */}
            {!food.isAvailable && (
              <div className="mt-5 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3">
                <p className="text-sm text-red-300/80">
                  This dish is currently unavailable.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0d0d0d] transition-colors duration-300 hover:bg-[#e8c982]"
              >
                Explore More

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodDetails;