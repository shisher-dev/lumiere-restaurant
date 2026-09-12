import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const fallbackDish = {
  name: "Signature Grilled Steak",
  price: 2200,
  category: "Premium Beef",
  description:
    "A carefully selected cut of premium beef, grilled to perfection and served with seasonal vegetables and our signature house sauce.",
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1400&q=85",
};

function ChefSpecial() {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefSpecial = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/foods"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chef special");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to fetch chef special"
          );
        }

        const featuredFood = (result.data || []).find(
          (food) => food.isFeatured && food.isAvailable
        );

        setDish(featuredFood || fallbackDish);
      } catch (error) {
        console.error("Chef special error:", error);
        setDish(fallbackDish);
      } finally {
        setLoading(false);
      }
    };

    fetchChefSpecial();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">
            <div className="min-h-105 animate-pulse bg-white/5 lg:min-h-150" />

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="h-4 w-32 animate-pulse rounded bg-white/5" />

              <div className="mt-6 h-12 w-3/4 animate-pulse rounded bg-white/5" />

              <div className="mt-8 h-20 animate-pulse rounded bg-white/5" />

              <div className="mt-7 h-20 animate-pulse rounded bg-white/5" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentDish = dish || fallbackDish;

  const rating = Number(currentDish.rating || 0).toFixed(1);

  const categoryName =
    currentDish.category?.name ||
    currentDish.category ||
    "Signature Dish";

  return (
    <section className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-105 overflow-hidden lg:min-h-150">
            <img
              src={currentDish.image}
              alt={currentDish.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute left-6 top-6 rounded-full border border-[#e8c982]/40 bg-black/50 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#e8c982]">
                Chef&apos;s Signature
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            {/* Section Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                From Our Kitchen
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              The Chef&apos;s
              <span className="block text-[#e8c982]">
                Special
              </span>
            </h2>

            {/* Dish Info */}
            <div className="mt-8 flex items-start justify-between gap-5 border-b border-white/10 pb-6">
              <div>
                <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
                  {currentDish.name}
                </h3>

                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
                  {categoryName}
                </p>
              </div>

              <span className="shrink-0 text-xl font-semibold text-[#e8c982]">
                ৳{Number(currentDish.price || 0).toLocaleString("en-BD")}
              </span>
            </div>

            {/* Description */}
            <p className="mt-7 text-sm leading-7 text-white/55 sm:text-base">
              {currentDish.description}
            </p>

            {/* Rating */}
            <div className="mt-7 flex items-center gap-4">
              <div
                className="flex items-center gap-1"
                aria-label={`${rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill={
                      index < Math.round(Number(rating))
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={1.5}
                    className="text-[#e8c982]"
                  />
                ))}
              </div>

              <span className="text-sm text-white/50">
                {rating} · Guest Favorite
              </span>
            </div>

            {/* Chef */}
            <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/40 bg-[#d6ad60]/10">
                <span className="font-serif text-lg text-[#e8c982]">
                  L
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Chef Lumière
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Executive Chef
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to={
                currentDish.id
                  ? `/food/${currentDish.id}`
                  : "/menu"
              }
              className="group mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition-all duration-300 hover:bg-[#e8c982]"
            >
              View Dish

              <ArrowRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChefSpecial;