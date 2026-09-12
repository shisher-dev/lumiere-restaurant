import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const defaultContent = {
  description:
    "Lumière was born from a simple belief — great food has the power to bring people together. Every dish we create is inspired by fresh ingredients, timeless techniques, and a passion for unforgettable flavors.",
  secondaryDescription:
    "From our kitchen to your table, we focus on quality, warmth, and genuine hospitality. Every visit should feel special, every meal should tell a story.",
  image:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
};

function AboutSection() {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurant information");
        }

        const result = await response.json();

        if (result.success) {
          setRestaurant(result.data);
        }
      } catch (error) {
        console.error("About section error:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const restaurantDescription =
    restaurant?.description?.trim() || defaultContent.description;

  const restaurantImage =
    restaurant?.coverImage?.trim() || defaultContent.image;

  return (
    <section
      id="about"
      className="overflow-hidden bg-[#111111] px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={restaurantImage}
                alt={`${restaurant?.name || "Lumière"} restaurant interior`}
                loading="lazy"
                className="h-105 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-125"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#0d0d0d] shadow-2xl sm:-right-6">
              <span className="font-serif text-3xl text-[#e8c982]">
                10+
              </span>

              <span className="mt-1 text-center text-[9px] uppercase tracking-[0.2em] text-white/50">
                Years of
                <br />
                Excellence
              </span>
            </div>

            {/* Secondary Image */}
            <div className="absolute -bottom-10 left-4 hidden w-44 overflow-hidden rounded-xl border-4 border-[#111111] shadow-xl sm:block">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=85"
                alt="Lumière dining experience"
                loading="lazy"
                className="h-32 w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            {/* Section Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              A place where
              <span className="block text-[#e8c982]">
                food meets passion.
              </span>
            </h2>

            {/* Description */}
            <div className="mt-7 space-y-4 text-sm leading-7 text-white/55 sm:text-base">
              <p>{restaurantDescription}</p>

              <p>{defaultContent.secondaryDescription}</p>
            </div>

            {/* Values */}
            <div className="mt-9 grid gap-6 border-y border-white/10 py-7 sm:grid-cols-3 sm:gap-5">
              {/* Fresh Ingredients */}
              <div>
                <div
                  aria-hidden="true"
                  className="mb-3 text-2xl text-[#e8c982]"
                >
                  ✦
                </div>

                <h3 className="text-sm font-medium text-white">
                  Fresh Ingredients
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  Carefully selected every day.
                </p>
              </div>

              {/* Happy Guests */}
              <div>
                <div
                  aria-hidden="true"
                  className="mb-3 text-2xl text-[#e8c982]"
                >
                  ♡
                </div>

                <h3 className="text-sm font-medium text-white">
                  Happy Guests
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  Your experience matters to us.
                </p>
              </div>

              {/* Crafted With Care */}
              <div>
                <div
                  aria-hidden="true"
                  className="mb-3 text-2xl text-[#e8c982]"
                >
                  ◇
                </div>

                <h3 className="text-sm font-medium text-white">
                  Crafted With Care
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  Every plate made with passion.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#d6ad60] px-6 py-3.5 text-sm font-medium text-[#e8c982] transition-all duration-300 hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
            >
              Discover Our Story

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

export default AboutSection;