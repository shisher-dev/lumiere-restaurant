import {
  ArrowRight,
  Clock3,
  Star,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-20 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#e8c982]">
              Welcome to Lumière
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Taste the
            <span className="block text-[#e8c982]">
              Extraordinary
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            Experience the perfect blend of exquisite flavors,
            warm hospitality, and an unforgettable dining atmosphere.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition duration-300 hover:bg-[#e8c982]"
            >
              Explore Menu

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-[#d6ad60] hover:text-[#e8c982]"
            >
              Our Story
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-14 grid max-w-2xl grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
            {/* Fresh Ingredients */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                <Utensils
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#e8c982]"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Fresh Ingredients
                </p>

                <p className="text-xs text-white/45">
                  Quality in every bite
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                <Star
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#e8c982]"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  5.0 Rating
                </p>

                <p className="text-xs text-white/45">
                  Loved by our guests
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                <Clock3
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#e8c982]"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Open Daily
                </p>

                <p className="text-xs text-white/45">
                  10 AM — 11 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
}

export default HeroSection;