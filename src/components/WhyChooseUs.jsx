import {
  ArrowRight,
  ChefHat,
  Heart,
  Leaf,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We carefully select fresh, premium ingredients to bring natural flavor to every dish.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our experienced chefs combine creativity, technique, and passion in every plate.",
  },
  {
    icon: Heart,
    title: "Made With Passion",
    description:
      "From preparation to presentation, every dish is made with genuine care and passion.",
  },
  {
    icon: Sparkles,
    title: "Exceptional Experience",
    description:
      "A warm atmosphere, beautiful presentation, and thoughtful service come together for every guest.",
  },
];

function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#101010] px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d6ad60]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#d6ad60]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              The Lumière Difference
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Why Choose
            <span className="text-[#e8c982]"> Us?</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            Every detail at Lumière is thoughtfully crafted to create
            an unforgettable dining experience.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-[#141414] p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40 hover:bg-[#171717]"
              >
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10 transition-transform duration-500 group-hover:scale-110">
                  <Icon
                    size={27}
                    strokeWidth={1.5}
                    className="text-[#e8c982]"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 font-serif text-xl text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-white/45">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
              <Utensils
                size={20}
                strokeWidth={1.5}
                className="text-[#e8c982]"
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Crafted for unforgettable moments
              </p>

              <p className="mt-1 text-xs text-white/40">
                Quality · Passion · Excellence
              </p>
            </div>
          </div>

          <Link
            to="/menu"
            className="group inline-flex items-center gap-3 text-sm font-medium text-[#e8c982] transition-colors duration-300 hover:text-white"
          >
            Explore Our Menu

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;