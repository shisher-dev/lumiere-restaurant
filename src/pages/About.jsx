import { useEffect, useState } from "react";
import { ArrowRight, Award, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Sparkles,
    title: "Exceptional Taste",
    description:
      "Every dish is thoughtfully prepared with quality ingredients and attention to detail.",
  },
  {
    icon: Heart,
    title: "Made With Passion",
    description:
      "We believe great food is created with passion, care and a genuine love for hospitality.",
  },
  {
    icon: Award,
    title: "Beautiful Experience",
    description:
      "From the atmosphere to the final bite, every detail is designed to make your visit memorable.",
  },
];

const fallbackRestaurant = {
  name: "Lumière",
  description:
    "Lumière is a place where exceptional food, thoughtful hospitality and beautiful moments come together.",
  coverImage:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
};

function About() {
  const [restaurant, setRestaurant] = useState(fallbackRestaurant);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurant settings");
        }

        const result = await response.json();

        if (result.success && result.data) {
          setRestaurant({
            ...fallbackRestaurant,
            ...result.data,
          });
        }
      } catch (error) {
        console.error("About page error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const restaurantName =
    restaurant.name?.trim() || fallbackRestaurant.name;

  const description =
    restaurant.description?.trim() ||
    fallbackRestaurant.description;

  const coverImage =
    restaurant.coverImage?.trim() ||
    fallbackRestaurant.coverImage;

  return (
    <main className="bg-[#0d0d0d] px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              Our Story
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            More Than Just
            <span className="text-[#e8c982]"> Dining</span>
          </h1>

          <p className="mt-6 text-sm leading-8 text-white/50 sm:text-base">
            {description}
          </p>
        </div>

        {/* Story */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src={coverImage}
              alt={`${restaurantName} restaurant interior`}
              loading="lazy"
              className="h-100 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-125"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 backdrop-blur-md">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#e8c982]">
                The {restaurantName} Experience
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d6ad60]">
              Welcome to {restaurantName}
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Crafted With Passion,
              <br />
              Served With Elegance.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-8 text-white/50 sm:text-base">
              <p>
                At {restaurantName}, we believe dining should be more
                than simply having a meal. It should be an experience
                worth remembering.
              </p>

              <p>
                Our kitchen combines carefully selected ingredients,
                thoughtful preparation and timeless flavors to create
                dishes that feel both familiar and extraordinary.
              </p>

              <p>
                Whether you're joining us for a special celebration,
                a relaxed evening or simply a great meal, our team is
                here to make every moment feel special.
              </p>
            </div>

            <Link
              to="/menu"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0d0d0d] transition-colors duration-300 hover:bg-[#e8c982]"
            >
              Explore Our Menu

              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d6ad60]">
              What We Believe
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#e8c982]"
                    />
                  </div>

                  <h3 className="mt-5 font-serif text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/40">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 border-y border-white/10 py-8 sm:grid-cols-4">
          {[
            ["10+", "Years of Excellence"],
            ["50+", "Signature Dishes"],
            ["5.0", "Guest Rating"],
            ["500+", "Happy Guests"],
          ].map(([number, label], index, stats) => (
            <div
              key={label}
              className={`px-3 text-center ${
                index < stats.length - 1
                  ? "border-r border-white/10"
                  : ""
              }`}
            >
              <p className="font-serif text-2xl text-[#e8c982]">
                {number}
              </p>

              <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/30 sm:text-[10px]">
                {label}
              </p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="sr-only" aria-live="polite">
            Loading restaurant information...
          </div>
        )}
      </div>
    </main>
  );
}

export default About;