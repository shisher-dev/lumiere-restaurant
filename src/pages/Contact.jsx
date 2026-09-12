import { useEffect, useState } from "react";
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
  address: "123 Restaurant Street, City",
  phone: "+880 1XXX-XXXXXX",
  email: "hello@lumiere.com",
  openingHours: {
    mondayThursday: "11:00 AM – 10:00 PM",
    fridaySaturday: "11:00 AM – 11:00 PM",
    sunday: "12:00 PM – 10:00 PM",
  },
};

function Contact() {
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
        console.error("Contact page error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const address =
    restaurant.address?.trim() || fallbackRestaurant.address;

  const phone =
    restaurant.phone?.trim() || fallbackRestaurant.phone;

  const email =
    restaurant.email?.trim() || fallbackRestaurant.email;

  const restaurantName =
    restaurant.name?.trim() || fallbackRestaurant.name;

  let openingHours = fallbackRestaurant.openingHours;

  if (restaurant.openingHours) {
    try {
      const parsed =
        typeof restaurant.openingHours === "string"
          ? JSON.parse(restaurant.openingHours)
          : restaurant.openingHours;

      if (parsed && typeof parsed === "object") {
        openingHours = {
          ...fallbackRestaurant.openingHours,
          ...parsed,
        };
      }
    } catch {
      openingHours = fallbackRestaurant.openingHours;
    }
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <main className="bg-[#0d0d0d] px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6ad60]" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
              Contact
            </span>

            <span className="h-px w-10 bg-[#d6ad60]" />
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Visit{" "}
            <span className="text-[#e8c982]">
              {restaurantName}
            </span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
            We would love to welcome you. Find us, contact us,
            or simply come by and enjoy an unforgettable dining
            experience.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Address */}
          <article className="group rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/5">
              <MapPin
                size={19}
                strokeWidth={1.6}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-xl">
              Our Address
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              {address}
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition-colors hover:text-white"
            >
              Get Directions
              <ArrowRight size={14} />
            </a>
          </article>

          {/* Phone */}
          <article className="group rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/5">
              <Phone
                size={19}
                strokeWidth={1.6}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-xl">
              Call Us
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Have a question? We are happy to help.
            </p>

            <a
              href={`tel:${phone}`}
              className="mt-5 inline-block text-sm font-medium text-[#e8c982] transition-colors hover:text-white"
            >
              {phone}
            </a>
          </article>

          {/* Email */}
          <article className="group rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/5">
              <Mail
                size={19}
                strokeWidth={1.6}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-xl">
              Email Us
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Send us a message anytime.
            </p>

            <a
              href={`mailto:${email}`}
              className="mt-5 block break-all text-sm font-medium text-[#e8c982] transition-colors hover:text-white"
            >
              {email}
            </a>
          </article>

          {/* Hours */}
          <article className="group rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6ad60]/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/20 bg-[#d6ad60]/5">
              <Clock3
                size={19}
                strokeWidth={1.6}
                className="text-[#e8c982]"
              />
            </div>

            <h2 className="mt-5 font-serif text-xl">
              Opening Hours
            </h2>

            <div className="mt-3 space-y-2 text-sm text-white/45">
              <p>
                Mon – Thu:{" "}
                <span className="text-white/65">
                  {openingHours.mondayThursday}
                </span>
              </p>

              <p>
                Fri – Sat:{" "}
                <span className="text-white/65">
                  {openingHours.fridaySaturday}
                </span>
              </p>

              <p>
                Sunday:{" "}
                <span className="text-white/65">
                  {openingHours.sunday}
                </span>
              </p>
            </div>
          </article>
        </div>

        {/* Map */}
        <section className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#121212]">
          <div className="grid lg:grid-cols-2">

            {/* Map Area */}
            <div className="relative min-h-90 overflow-hidden bg-[#171717]">
              <iframe
                title={`${restaurantName} location`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  address
                )}&output=embed`}
                className="absolute inset-0 h-full w-full border-0 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#e8c982]">
                Find Us
              </span>

              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Come and experience{" "}
                <span className="text-[#e8c982]">
                  {restaurantName}
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">
                Whether you are joining us for a special occasion
                or simply enjoying a quiet meal, our team is ready
                to make your visit memorable.
              </p>

              <div className="mt-7 flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#e8c982]"
                />

                <span className="text-sm leading-6 text-white/60">
                  {address}
                </span>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0d0d0d] transition-all duration-300 hover:bg-[#e8c982]"
              >
                Open in Google Maps

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-white/40">
            Ready to explore our menu?
          </p>

          <Link
            to="/menu"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#e8c982] transition-colors hover:text-white"
          >
            Explore Our Menu
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
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

export default Contact;