import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const fallbackReviews = [
  {
    id: "fallback-1",
    name: "Sarah Williams",
    role: "Food Enthusiast",
    rating: 5,
    comment:
      "An absolutely wonderful dining experience. The food was exceptional and the atmosphere was beautiful.",
  },
  {
    id: "fallback-2",
    name: "James Anderson",
    role: "Regular Guest",
    rating: 5,
    comment:
      "Lumière has become one of my favorite places. Excellent food, warm hospitality and a beautiful setting.",
  },
  {
    id: "fallback-3",
    name: "Emily Carter",
    role: "Happy Guest",
    rating: 5,
    comment:
      "Everything was perfect from the presentation to the taste. I would definitely recommend Lumière.",
  },
];

function Reviews() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [loading, setLoading] = useState(true);

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
        console.error("Reviews page error:", error);
      } finally {
        setLoading(false);
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
      className="bg-[#0d0d0d] px-5 py-24 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              Guest Reviews
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            What Our Guests
            <span className="text-[#e8c982]"> Say</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            Every visit matters to us. Here is what some of our guests
            have to say about their experience at Lumière.
          </p>
        </div>

        {/* Reviews */}
        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-white/10 bg-[#121212]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id || review.name}
                className="group rounded-2xl border border-white/10 bg-[#121212] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30"
              >
                {/* Stars */}
                <div
                  className="flex gap-1"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      strokeWidth={1.5}
                      fill={
                        index < Number(review.rating)
                          ? "currentColor"
                          : "none"
                      }
                      className="text-[#e8c982]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-6 text-sm leading-7 text-white/60">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Guest */}
                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white">
                    {review.name}
                  </p>

                  {review.role && (
                    <p className="mt-1 text-xs text-white/35">
                      {review.role}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Rating Summary */}
        <div className="mt-12 flex flex-col items-center justify-center border-y border-white/10 py-8 sm:flex-row sm:gap-5">
          <div className="flex items-center gap-2">
            <Star
              size={20}
              strokeWidth={1.5}
              fill="currentColor"
              className="text-[#e8c982]"
            />

            <span className="font-serif text-2xl text-[#e8c982]">
              {ratingSummary.average}
            </span>
          </div>

          <span className="hidden h-5 w-px bg-white/10 sm:block" />

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
            Average Guest Rating
          </p>
        </div>
      </div>
    </section>
  );
}

export default Reviews;