import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const fallbackReviews = [
  {
    id: "fallback-1",
    name: "Alex Morgan",
    role: "Food Enthusiast",
    rating: 5,
    comment:
      "Absolutely beautiful atmosphere and incredible food. Everything was presented perfectly and tasted amazing.",
  },
  {
    id: "fallback-2",
    name: "Sophia Bennett",
    role: "Regular Guest",
    rating: 5,
    comment:
      "One of the best dining experiences I've had. The steak was perfectly cooked, the service was wonderful, and the atmosphere felt truly special.",
  },
  {
    id: "fallback-3",
    name: "Daniel Carter",
    role: "Happy Guest",
    rating: 5,
    comment:
      "A perfect place for a special evening. Delicious dishes, elegant surroundings and genuinely friendly service.",
  },
];

function ReviewsSection() {
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/reviews"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid reviews response");
        }

        const visibleReviews = result.data.filter(
          (review) => review.isVisible
        );

        if (visibleReviews.length > 0) {
          setReviews(visibleReviews.slice(0, 3));
        }
      } catch (error) {
        console.error("Reviews section error:", error);
      }
    };

    fetchReviews();
  }, []);

  const ratingSummary = useMemo(() => {
    if (!reviews.length) {
      return {
        average: "0.0",
        count: 0,
      };
    }

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return {
      average: (total / reviews.length).toFixed(1),
      count: reviews.length,
    };
  }, [reviews]);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d6ad60]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              Guest Experiences
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            What Our Guests
            <span className="text-[#e8c982]"> Say</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            Great food becomes even more special when shared with
            unforgettable experiences.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mx-auto mt-12 flex w-fit flex-wrap items-center justify-center gap-4 rounded-full border border-white/10 bg-[#141414] px-6 py-3 sm:gap-5">
          <div
            className="flex items-center gap-1"
            aria-label={`${ratingSummary.average} average rating`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={17}
                fill="currentColor"
                strokeWidth={1.5}
                className="text-[#e8c982]"
              />
            ))}
          </div>

          <div className="hidden h-5 w-px bg-white/15 sm:block" />

          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">
              {ratingSummary.average}
            </span>

            {" · "}

            {ratingSummary.count > 0
              ? `${ratingSummary.count} Guest Reviews`
              : "Guest Reviews"}
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => {
            const rating = Math.max(
              0,
              Math.min(5, Number(review.rating) || 0)
            );

            const initial =
              review.name?.trim()?.charAt(0)?.toUpperCase() || "L";

            const isFeatured = index === 1;

            return (
              <article
                key={review.id || review.name}
                className={`group rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-2 ${
                  isFeatured
                    ? "border-[#d6ad60]/25 bg-[#151515] hover:border-[#d6ad60]/50"
                    : "border-white/10 bg-[#121212] hover:border-[#d6ad60]/40"
                }`}
              >
                {/* Stars + Badge */}
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="flex gap-1"
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        fill={
                          starIndex < Math.round(rating)
                            ? "currentColor"
                            : "none"
                        }
                        strokeWidth={1.5}
                        className="text-[#e8c982]"
                      />
                    ))}
                  </div>

                  <span className="text-right text-[10px] font-medium uppercase tracking-wider text-white/30">
                    {isFeatured
                      ? "Featured Review"
                      : "Guest Review"}
                  </span>
                </div>

                {/* Review Text */}
                <p className="mt-7 text-sm leading-7 text-white/60">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Guest Info */}
                <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/10 font-serif text-lg text-[#e8c982]">
                    {initial}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {review.name}
                    </h3>

                    {review.role && (
                      <p className="mt-1 text-xs text-white/35">
                        {review.role}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
            Your experience matters to us
          </p>

          <Link
            to="/reviews"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#e8c982] transition-colors duration-300 hover:text-white"
          >
            Read All Reviews

            <ArrowRight
              size={16}
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

export default ReviewsSection;