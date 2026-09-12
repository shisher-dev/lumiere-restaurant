import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Lumière Restaurant home"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#d6ad60]/10 transition-colors duration-300 group-hover:border-[#d6ad60]">
            <span
              aria-hidden="true"
              className="text-xl text-[#e8c982]"
            >
              ✦
            </span>
          </div>

          <div>
            <span className="block font-serif text-xl tracking-[0.25em] text-[#f5dfaa]">
              LUMIÈRE
            </span>

            <span className="block text-[8px] tracking-[0.35em] text-white/50">
              PREMIUM RESTAURANT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.name}
                to={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-[#e8c982]"
                    : "text-white/70 hover:text-[#e8c982]"
                }`}
              >
                {link.name}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-px w-full bg-[#d6ad60]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/menu"
            className="rounded-full border border-[#d6ad60] px-5 py-2.5 text-xs font-medium tracking-wider text-[#e8c982] transition-all duration-300 hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
          >
            VIEW MENU
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 p-2 text-white transition-colors duration-300 hover:border-[#d6ad60]/40 hover:text-[#e8c982] lg:hidden"
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#0d0d0d] transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-125 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`border-b border-white/5 py-4 text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-[#e8c982]"
                      : "text-white/75 hover:text-[#e8c982]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              to="/menu"
              onClick={closeMenu}
              className="mt-5 rounded-full bg-[#d6ad60] py-3 text-center text-sm font-medium text-[#0d0d0d] transition-colors duration-300 hover:bg-[#e8c982]"
            >
              VIEW MENU
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;