import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const fallbackRestaurant = {
  name: "Lumière",
  address: "123 Grand Avenue, Downtown, BD",
  phone: "+8801409658800",
  email: "akshisher@gmail.com",
  openingHours: {
    mondayThursday: "11:00 AM – 10:00 PM",
    fridaySaturday: "11:00 AM – 11:00 PM",
    sunday: "12:00 PM – 10:00 PM",
  },
};

function LocationSection() {
  const [restaurant, setRestaurant] = useState(fallbackRestaurant);

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

        if (result.success && result.data) {
          setRestaurant((current) => ({
            ...current,
            ...result.data,
          }));
        }
      } catch (error) {
        console.error("Location section error:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const address = restaurant.address?.trim() || fallbackRestaurant.address;
  const phone = restaurant.phone?.trim() || fallbackRestaurant.phone;
  const email = restaurant.email?.trim() || fallbackRestaurant.email;

  const openingHours = useMemo(() => {
    const value = restaurant.openingHours;

    if (!value) {
      return fallbackRestaurant.openingHours;
    }

    try {
      const parsed =
        typeof value === "string"
          ? JSON.parse(value)
          : value;

      if (parsed && typeof parsed === "object") {
        return {
          ...fallbackRestaurant.openingHours,
          ...parsed,
        };
      }
    } catch {
      // Supports plain-text opening hours from Restaurant Settings.
    }

    return fallbackRestaurant.openingHours;
  }, [restaurant.openingHours]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              Come & Visit
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Find Your Way to
            <span className="text-[#e8c982]"> Lumière</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            We would love to welcome you for an unforgettable dining
            experience.
          </p>
        </div>

        {/* Location Card */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-107.5 overflow-hidden lg:min-h-140">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=85"
              alt={`${restaurant.name || "Lumière"} restaurant interior`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/45" />

            {/* Location Overlay */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl sm:left-8 sm:right-auto sm:max-w-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6ad60]">
                  <MapPin
                    size={20}
                    strokeWidth={1.7}
                    className="text-[#0d0d0d]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8c982]">
                    Our Location
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/80">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

            {/* Address */}
            <div className="flex gap-5 border-b border-white/10 pb-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#e8c982]"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8c982]">
                  Address
                </p>

                <h3 className="mt-2 font-serif text-xl text-white">
                  {address}
                </h3>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="border-b border-white/10 py-7">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                  <Clock3
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#e8c982]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8c982]">
                    Opening Hours
                  </p>

                  <h3 className="mt-2 font-serif text-xl text-white">
                    We&apos;re Open Daily
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                  <span className="text-white/45">
                    Monday – Thursday
                  </span>

                  <span className="text-white/75 sm:text-right">
                    {openingHours.mondayThursday}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                  <span className="text-white/45">
                    Friday – Saturday
                  </span>

                  <span className="text-white/75 sm:text-right">
                    {openingHours.fridaySaturday}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                  <span className="text-white/45">
                    Sunday
                  </span>

                  <span className="text-white/75 sm:text-right">
                    {openingHours.sunday}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="pt-7">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
                  <Phone
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#e8c982]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8c982]">
                    Contact Us
                  </p>

                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="mt-2 block font-serif text-xl text-white transition-colors duration-300 hover:text-[#e8c982]"
                  >
                    {phone}
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="mt-2 flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-[#e8c982]"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    {email}
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition-colors duration-300 hover:bg-[#e8c982]"
                >
                  Get Directions

                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/75 transition-colors duration-300 hover:border-[#d6ad60] hover:text-[#e8c982]"
                >
                  Contact Page
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;