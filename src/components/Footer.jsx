import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "Our Menu", href: "/menu" },
  { name: "Our Story", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
  },
  {
    name: "TikTok",
    href: "#",
    icon: "tiktok",
  },
];

const fallbackRestaurant = {
  name: "Lumière",
  description:
    "Where exceptional flavors, thoughtful hospitality and beautiful moments come together. Welcome to Lumière.",
  address: "123 Grand Avenue, Downtown, BD",
  phone: "+8801409658800",
  email: "hello@lumiere.com",
};

function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10H8v3h2.6v8h2.9Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          className="fill-current stroke-none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M14.2 4.2c.4 1.5 1.3 2.5 2.9 2.8v2.3c-.9-.1-1.7-.4-2.4-.9v5.2c0 3.2-2 5.2-5 5.2-2.4 0-4.3-1.7-4.3-4 0-2.5 2.1-4.2 4.5-4.2.3 0 .6 0 .9.1v2.4c-.3-.1-.6-.2-.9-.2-1.1 0-2 .7-2 1.8 0 1 .8 1.8 1.9 1.8 1.3 0 2-1 2-2.5V4.2h2.4Z" />
    </svg>
  );
}

function Footer() {
  const [restaurant, setRestaurant] =
    useState(fallbackRestaurant);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch restaurant settings"
          );
        }

        const result = await response.json();

        if (result.success && result.data) {
          setRestaurant({
            ...fallbackRestaurant,
            ...result.data,
          });
        }
      } catch (error) {
        console.error("Footer restaurant error:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const restaurantName =
    restaurant.name?.trim() || fallbackRestaurant.name;

  const description =
    restaurant.description?.trim() ||
    fallbackRestaurant.description;

  const address =
    restaurant.address?.trim() ||
    fallbackRestaurant.address;

  const phone =
    restaurant.phone?.trim() ||
    fallbackRestaurant.phone;

  const email =
    restaurant.email?.trim() ||
    fallbackRestaurant.email;

  return (
    <footer className="border-t border-white/10 bg-[#090909] px-5 pt-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              aria-label={`${restaurantName} home`}
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#d6ad60]/10">
                <span
                  aria-hidden="true"
                  className="text-xl text-[#e8c982]"
                >
                  ✦
                </span>
              </div>

              <div>
                <span className="block font-serif text-2xl tracking-[0.25em] text-[#f5dfaa]">
                  {restaurantName.toUpperCase()}
                </span>

                <span className="mt-1 block text-[8px] tracking-[0.35em] text-white/40">
                  PREMIUM RESTAURANT
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
              {description}
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  onClick={(event) => {
                    if (social.href === "#") {
                      event.preventDefault();
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-[#e8c982]">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-6 flex flex-col gap-4"
            >
              {exploreLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="w-fit text-sm text-white/45 transition-colors duration-300 hover:text-[#e8c982]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-[#e8c982]">
              Contact
            </h2>

            <div className="mt-6 space-y-5">

              {/* Address */}
              <div>
                <p className="text-xs uppercase tracking-wider text-white/25">
                  Address
                </p>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  {address}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs uppercase tracking-wider text-white/25">
                  Phone
                </p>

                <a
                  href={`tel:${phone}`}
                  className="mt-2 block text-sm text-white/50 transition-colors duration-300 hover:text-[#e8c982]"
                >
                  {phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-wider text-white/25">
                  Email
                </p>

                <a
                  href={`mailto:${email}`}
                  className="mt-2 block break-all text-sm text-white/50 transition-colors duration-300 hover:text-[#e8c982]"
                >
                  {email}
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {restaurantName}.
            All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">
            <span className="text-xs text-white/30">
              Privacy Policy
            </span>

            <span
              aria-hidden="true"
              className="h-3 w-px bg-white/10"
            />

            <span className="text-xs text-white/30">
              Terms
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;