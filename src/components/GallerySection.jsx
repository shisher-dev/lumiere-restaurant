import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fallbackImages = [
  {
    id: "fallback-1",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",
    alt: "Elegant restaurant interior",
    label: "The Atmosphere",
    title: "Where Every Moment Matters",
  },
  {
    id: "fallback-2",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    alt: "Fresh restaurant dish",
    label: "Fresh Flavors",
  },
  {
    id: "fallback-3",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
    alt: "Fine dining table",
    label: "Fine Dining",
  },
  {
    id: "fallback-4",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    alt: "Premium grilled dish",
    label: "Signature Dish",
  },
  {
    id: "fallback-5",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    alt: "Lumière restaurant dining area",
    label: "Our Space",
  },
];

function GallerySection() {
  const [galleryImages, setGalleryImages] =
    useState(fallbackImages);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/gallery"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid gallery response");
        }

        const visibleImages = result.data.filter(
          (item) => item.isVisible
        );

        if (visibleImages.length > 0) {
          setGalleryImages(visibleImages.slice(0, 5));
        }
      } catch (error) {
        console.error("Gallery section error:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section
      id="gallery"
      className="bg-[#101010] px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d6ad60]" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                Inside Lumière
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              A Glimpse of
              <span className="text-[#e8c982]"> Lumière</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Discover the atmosphere, flavors, and beautiful moments
              that make every visit to Lumière special.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#d6ad60]/60 px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition-all duration-300 hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
          >
            Visit Us

            <ArrowRight
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item, index) => {
            const isLarge = index === 0;

            return (
              <div
                key={item.id || item.image}
                className={`group relative overflow-hidden rounded-2xl ${
                  isLarge
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={
                    item.title ||
                    item.alt ||
                    item.label ||
                    "Lumière restaurant gallery"
                  }
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    isLarge
                      ? "h-105 lg:h-156.25"
                      : "h-105"
                  }`}
                />

                {/* Base Overlay */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

                {/* Large Image Gradient */}
                {isLarge && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                )}

                {/* Small Image Label */}
                {!isLarge && item.label && (
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                      {item.label}
                    </span>
                  </div>
                )}

                {/* Large Image Content */}
                {isLarge && (
                  <div className="absolute bottom-0 left-0 p-7">
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                      {item.label || "The Atmosphere"}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl">
                      {item.title || "Where Every Moment Matters"}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Gallery Summary */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-y border-white/10 py-8 sm:flex-row">
          <div>
            <p className="font-serif text-2xl text-[#e8c982]">
              {galleryImages.length}+
            </p>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
              Featured Moments
            </p>
          </div>

          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#e8c982] transition-colors duration-300 hover:text-white"
          >
            View Full Gallery

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

export default GallerySection;