import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ count, isLoggedIn, onToggleLogin }) {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ১. পেজ লোডের entrance animation (একবারই চলবে)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(navRef.current, { y: -40, opacity: 0, duration: 0.5 })
          .from(".nav-logo", { y: -10, opacity: 0, duration: 0.4 }, "-=0.2")
          .from(
            ".nav-item",
            { y: -10, opacity: 0, duration: 0.4, stagger: 0.08 },
            "-=0.2"
          )
          .from(
            ".nav-cta",
            { x: 20, opacity: 0, duration: 0.4, stagger: 0.1 },
            "-=0.3"
          );
      });
    },
    { scope: navRef }
  );

  // ২. মোবাইল মেনু খোলার animation
  useGSAP(
    () => {
      if (!isOpen) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(mobileMenuRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.25,
        }).from(
          ".mobile-item",
          { x: -16, opacity: 0, duration: 0.3, stagger: 0.06 },
          "-=0.1"
        );
      });
    },
    { scope: mobileMenuRef, dependencies: [isOpen] }
  );

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-linear-to-r from-indigo-700 via-blue-600 to-purple-700 shadow-md"
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="nav-logo flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm text-indigo-700"
            aria-hidden="true"
          >
            D
          </span>
          DevStore
        </a>

        {/* Desktop/Tablet links */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="nav-item">
              <a
                href={link.href}
                className="text-sm font-medium text-blue-100 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop/Tablet: Cart + Login */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="nav-cta rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            Cart: {count}
          </span>

          <button
            type="button"
            onClick={onToggleLogin}
            className="nav-cta rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>

        {/* Hamburger button (শুধু মোবাইলে) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="border-t border-white/20 bg-indigo-800 shadow-md md:hidden"
        >
          <ul className="space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-item">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li className="mobile-item pt-2">
              <span className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-indigo-700">
                Cart: {count}
              </span>
            </li>

            <li className="mobile-item">
              <button
                type="button"
                onClick={() => {
                  onToggleLogin();
                  closeMenu();
                }}
                className="block w-full rounded-full border border-white/70 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}